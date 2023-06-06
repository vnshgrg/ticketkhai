import { KomojuStatus } from "@prisma/client"
import Stripe from "stripe"

import { DB } from "../db"
import { issueTicket } from "./issueTickets"

export const fulFillOrder = async (webhook: Stripe.Event) => {
  const checkoutSession = webhook.data.object as Stripe.Checkout.Session
  try {
    // check transaction for verification
    const { amount_total: amount, metadata } = checkoutSession
    // get transaction
    const transaction = await DB.transaction.findUnique({
      where: { id: metadata.transactionId },
      select: {
        status: true,
        totalPrice: true,
        eventId: true,
        ticketTypeId: true,
        quantity: true,
        user: {
          select: { id: true, mobile: true },
        },
      },
    })

    const { status, totalPrice, user, eventId, ticketTypeId, quantity } =
      transaction
    if (
      status === KomojuStatus.cancelled ||
      status === KomojuStatus.expired ||
      status === KomojuStatus.captured ||
      status === KomojuStatus.failed
    ) {
      await DB.webhook.create({
        data: {
          type: webhook.type,
          data: webhook as any,
          result: false,
          result_message: "Transaction status invalid.",
        },
      })
      return {
        result: false,
        message: "Transaction status invalid so we just ignore this.",
      }
    }

    if (totalPrice !== amount) {
      await DB.webhook.create({
        data: {
          type: webhook.type,
          data: webhook as any,
          result: false,
          result_message:
            "Amount did not match. Something is fishy so declining this request.",
        },
      })
      return {
        result: false,
        message:
          "Amount did not match. Something is fishy so declining this request.",
      }
    }

    // check if payment intent is complete

    // fulfill order
    await issueTicket({
      eventId,
      ticketTypeId,
      quantity,
      transactionId: metadata.transactionId,
      user,
      hook: checkoutSession as any,
    })
    return {
      result: true,
      message: "Ticket issued.",
    }
  } catch (error) {
    return {
      result: false,
      message: error.message || "An unknown error occurred.",
    }
  }
}
