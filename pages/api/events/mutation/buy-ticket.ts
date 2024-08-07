import type { NextApiRequest, NextApiResponse } from "next"
import { createCustomer, searchCustomer } from "@/src/lib"
import { DB } from "@/src/utils/db"
import { KomojuStatus } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import Stripe from "stripe"

import { events } from "@/src/config/events"
import { authOptions } from "../../auth/[...nextauth]"

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2022-11-15",
})

export interface BuyTicketParams {
  eventId: string
  ticketId: string
  noOfTickets: number
}

export type StripeLocaleRecord = Record<
  "en" | "jp",
  Stripe.Checkout.SessionCreateParams.Locale
>

const stripeLocale = { en: "en", jp: "ja" }

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

        // get user's locale
        const lang = req.headers["accept-language"] || "en"
        const locale = stripeLocale[lang] || stripeLocale.en

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

        const event = events.find((event) => event.id === eventId)
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

        const ticketMultiplier = ticket.numberOfTickets || 1
        const totalTicketsToBeIssued = noOfTickets * ticketMultiplier

        if (
          soldTickets._sum.quantity + totalTicketsToBeIssued >
          ticket.maximumNumberOfTicketsAvailable
        ) {
          res.status(400).json({
            result: false,
            message: `${noOfTickets} ${ticket.title} for ${event.title} is currently unavailable.`,
          })
          return
        }

        const subtotal = ticket.price * noOfTickets

        const transaction = await DB.transaction.create({
          data: {
            eventId,
            ticketTypeId: ticketId,
            unitPrice: ticket.price,
            quantity: totalTicketsToBeIssued,
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
              "konbini",
              "customer_balance",
              "link",
            ],
            payment_method_options: {
              konbini: {
                expires_after_days: 2, // Konbini payment expires after 2 days
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
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/payment/?result=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/payment/?result=fail`,
            automatic_tax: { enabled: true },
            metadata: {
              transactionId: transaction.id,
            },
            locale,
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
