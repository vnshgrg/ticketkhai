import type { NextApiRequest, NextApiResponse } from "next"
import { DB } from "@/src/utils/db"
import axios from "axios"
import { getServerSession } from "next-auth/next"
import qs from "qs"

import { demoEvents } from "@/src/config/events"
import { siteConfig } from "@/src/config/site"
import { authOptions } from "../../auth/[...nextauth]"

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
        // const { handlingFee, paymentFee, tax } = siteConfig.fees

        const event = demoEvents.find((event) => event.id === eventId)
        const ticket = event.tickets.find((ticket) => ticket.id === ticketId)

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

        const requestData = qs.stringify({
          return_url: "http://localhost:3000",
          "line_items[][description]": `${ticket.title} ticket for ${event.title} (${event.subtitle})`,
          "line_items[][amount]": ticket.price,
          "line_items[][quantity]": noOfTickets,
          "line_items[][image]":
            "https://cdn-icons-png.flaticon.com/512/2067/2067179.png",
          currency: "JPY",
          "payment_data[external_order_num]": `${transaction.id}`,
          "payment_data[user_id]": `TK_${user.id}`,
          "payment_data[event_id]": `TK_${eventId}`,
          "payment_data[ticket_id]": `TK_${ticket.id}`,
          default_locale: "en",
          payment_methods: [
            {
              type: "credit_card",
            },
            {
              type: "konbini",
              brands: {
                "seven-eleven": "/images/konbini/seven-eleven.svg",
                lawson: "/images/konbini/lawson.svg",
                "family-mart": "/images/konbini/family-mart.svg",
                ministop: "/images/konbini/ministop.svg",
                "daily-yamazaki": "/images/konbini/daily-yamazaki.svg",
                seicomart: "/images/konbini/seicomart.svg",
              },
            },
            {
              type: "pay_easy",
            },
            {
              type: "paypay",
            },
            {
              type: "paidy",
            },
            {
              type: "linepay",
            },
            {
              type: "merpay",
            },
          ],
        })

        const headers = {
          Authorization: `Basic ${Buffer.from(
            process.env.KOMOJU_SK + ":"
          ).toString("base64")}`,
          "Content-Length": Buffer.byteLength(requestData),
        }

        try {
          const response = await axios({
            method: "post",
            data: requestData,
            url: "https://komoju.com/api/v1/sessions",
            headers,
          })

          const { data } = response

          // update transaction with komoju session

          res.status(200).json({ result: true, message: "", data: data })
          return
        } catch (error) {
          console.log(error.response.data)
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
