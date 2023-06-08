import { fetchNextAction } from "@/src/lib"
import { KomojuStatus } from "@prisma/client"
import _ from "lodash"
import moment from "moment"

import { DB } from "../db"
import { eventById, ticketById } from "../temp"

export const listPendingTransactions = async (userId) => {
  try {
    const transactions = await DB.transaction.findMany({
      where: { AND: [{ userId }, { NOT: { status: KomojuStatus.captured } }] },
      select: {
        id: true,
        eventId: true,
        ticketTypeId: true,
        stripeSessionId: true,
        unitPrice: true,
        quantity: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tickets: {
          select: {
            id: true,
            status: true,
            ticketTypeId: true,
            createdAt: true,
            upatedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const populatedTransactions = transactions.map(async (transaction) => {
      let paymentDetails = null
      if (transaction.status === "authorized") {
        paymentDetails = await fetchNextAction(transaction.stripeSessionId)
      }
      return {
        ...transaction,
        event: eventById(transaction.eventId),
        paymentDetails,
        tickets: transaction.tickets.map((ticket) => {
          return {
            ...ticket,
            ..._.omit(ticketById(transaction.eventId, ticket.ticketTypeId), [
              "id",
            ]),
            createdAt: moment(ticket.createdAt).unix(),
            upatedAt: moment(ticket.upatedAt).unix(),
          }
        }),
        createdAt: moment(transaction.createdAt).unix(),
        updatedAt: moment(transaction.updatedAt).unix(),
      }
    })
    const result = await Promise.all(populatedTransactions)
    return result
  } catch (error) {
    console.log(error)
    return []
  }
}
