import type { NextApiRequest, NextApiResponse } from "next"
import { createCustomer, searchCustomer } from "@/src/lib"
import { DB } from "@/src/utils/db"
import {isProduction} from "@/src/utils"
import { KomojuStatus } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import Stripe, {PaymentMethodType} from "stripe"

import { demoEvents } from "@/src/config/events"
import { siteConfig } from "@/src/config/site"
import { authOptions } from "../../auth/[...nextauth]"

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2022-11-15",
})

export interface BuyTicketParams {
  eventId: string
  ticketId: string
  noOfTickets: number
}

const buyTicketHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "POST":
      try {
        const session = await getServerSession(req, res, authOptions)
        // Get user from session

        if (!session || !session.user) {
          res.status(401).end(`Unauthorized`)
          return
        }

        const { user } = session

        const { eventId, ticketId, noOfTickets }: Partial<BuyTicketParams> =
          body

        const maxNoOfTicketsAllowedForSingleTransaction = 20

        if (noOfTickets > maxNoOfTicketsAllowedForSingleTransaction) {
          res.status(400).json({
            result: false,
            message: `Purchase of more than ${maxNoOfTicketsAllowedForSingleTransaction} tickets is not allowed.`,
          })
          return
        }

        const event = demoEvents.find((event) => event.id === eventId)
        const ticket = event.tickets.find((ticket) => ticket.id === ticketId)

        if (!ticket.available) {
          res.status(400).json({
            result: false,
            message: `${ticket.title} tickets are not currently available for sale.`,
          })
          return
        }

        const soldTickets = await DB.transaction.aggregate({
          _sum: {
            quantity: true,
          },
          where: {
            status: KomojuStatus.captured,
            ticketTypeId: ticketId,
            eventId,
          },
        })

        if (
          soldTickets._sum.quantity + noOfTickets >
          ticket.maximumNumberOfTicketsAvailable
        ) {
          res.status(400).json({
            result: false,
            message: `${noOfTickets} ${ticket.title} for ${event.title} is currently unavailable.`,
          })
          return
        }

        const subtotal = ticket.price * noOfTickets
        // const paymentFeeAmount = paymentFee ? subtotal * (paymentFee / 100) : 0
        // const handlingFeeAmount = handlingFee || 0
        // const taxAmount = tax
        //   ? (subtotal + handlingFeeAmount + paymentFeeAmount) * (tax / 100)
        //   : 0
        // const total = Math.floor(
        //   subtotal + handlingFeeAmount + paymentFeeAmount + taxAmount
        // )

        // create Transaction

        const transaction = await DB.transaction.create({
          data: {
            eventId,
            ticketTypeId: ticketId,
            unitPrice: ticket.price,
            quantity: noOfTickets,
            discount: 0,
            tax: 0,
            handlingFee: 0,
            totalPrice: subtotal,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
          select: {
            id: true,
          },
        })

        try {
          const { id: userId, name, mobile } = user
          // check if stripe customer exists
          let customer = await searchCustomer(userId)

          if (!customer) {
            console.log("creating customer")
            customer = await createCustomer(userId, {
              name,
              mobile,
            })
          }

          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: ticket.stripePriceId,
                quantity: noOfTickets,
              },
            ],
            mode: "payment",
            payment_method_types: [
              "card",
              "alipay",
              "wechat_pay",
              "customer_balance",
              "link",
            ],
            payment_method_options: {
              wechat_pay: {
                client: "web",
              },
              customer_balance: {
                funding_type: "bank_transfer",
                bank_transfer: {
                  type: "jp_bank_transfer",
                },
              },
            },
            customer_update: {
              address: "auto",
              shipping: "auto",
              name: "auto",
            },
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/?result=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/?result=fail`,
            automatic_tax: { enabled: true },
            metadata: {
              transactionId: transaction.id,
            },
          })

          await DB.transaction.update({
            where: { id: transaction.id },
            data: { stripeSessionId: session.id },
          })

          res.status(200).json({
            result: true,
            message: "",
            data: { session_url: session.url },
          })
          return
        } catch (error) {
          console.log(error.message)
          console.log(error.response?.data)
          res.status(500).json({
            result: false,
            error:
              error?.response?.data?.message ||
              error?.message ||
              "An unknown error occurred.",
          })
          return
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({
          result: false,
          message: error.message || "An error occurred.",
        })
        return
      }

      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)

      break
  }
}

export default buyTicketHandler
