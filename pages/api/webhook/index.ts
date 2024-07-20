import type { NextApiRequest, NextApiResponse } from "next"
import { validateWebhook } from "@/src/lib"
import { DB } from "@/src/utils/db"
import { sendSMS } from "@/src/utils/sms"
import { KomojuStatus, TicketStatus } from "@prisma/client"

import { siteConfig } from "@/src/config/site"

export interface VerifyParams {
  page: number
  filters: any
}

const webhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, headers } = req

  switch (method) {
    case "POST":
      try {
        const body = await validateWebhook(headers, req)

        if (!body) {
          throw new Error("Could not validate webhook signature.")
        }

        const { type, resource, data, created_at, reason } = body

        // based on type switch case
        switch (type) {
          case "payment.captured":
            // check transaction for verification

            const { external_order_num, amount } = data

            // get transaction
            const transaction = await DB.transaction.findUnique({
              where: { id: external_order_num },
              include: {
                user: {
                  select: { id: true },
                },
              },
            })
            const {
              status,
              totalPrice,
              user,
              eventId,
              ticketTypeId,
              quantity,
            } = transaction
            if (
              status === KomojuStatus.cancelled ||
              status === KomojuStatus.expired ||
              status === KomojuStatus.captured ||
              status === KomojuStatus.failed
            ) {
              await DB.webhook.create({
                data: {
                  type,
                  resource,
                  data,
                  created_at,
                  reason,
                  result: false,
                  result_message: "Transaction status invalid.",
                },
              })
              res.status(200).json({
                result: false,
                message: "Transaction status invalid so we just ignore this.",
              })
              return
            }

            if (totalPrice !== amount) {
              await DB.webhook.create({
                data: {
                  type,
                  resource,
                  data,
                  created_at,
                  reason,
                  result: false,
                  result_message:
                    "Amount is mismatch. Something is fishy so declining this request.",
                },
              })
              res.status(200).json({
                result: false,
                message:
                  "Amount is mismatch. Something is fishy so declining this request.",
              })
              return
            }

            // issue tickets
            // generate ticket metadata
            let ticketsMetadata = []
            for (let i = 1; i <= quantity; i++) {
              ticketsMetadata.push({
                eventId,
                ticketTypeId,
                status: TicketStatus.available,
                transactionId: transaction.id,
                userId: user.id,
              })
            }

            await DB.$transaction([
              DB.ticket.createMany({
                data: ticketsMetadata,
              }),
              DB.webhook.create({
                data: {
                  type,
                  resource,
                  data,
                  created_at,
                  reason,
                  result: true,
                  result_message: "Tickets issued.",
                },
              }),
            ])

            // TODO: remove below line for querying tickets
            const userTickets = await DB.user.findUnique({
              where: { id: user.id },
              select: {
                tickets: true,
                mobile: true,
              },
            })

            try {
              await sendSMS({
                provider: "twilio",
                message: `Purchase complete. Tickets: ${siteConfig.baseurl}/user/tickets`,
                to: userTickets.mobile,
              })
            } catch (error) {
              console.log(error)
              res.status(500).json({
                result: false,
                message: "Could not send verification code.",
              })
              return
            }

            res.status(200).json({ result: true, message: "Tickets issued." })
            return
            // respond good
            break
        }

        res.status(200).json({ result: true, message: "success" })
      } catch (error) {
        await DB.webhook.create({
          data: {
            result: false,
            result_message: error.message || "An unknown error occurred.",
            komoju_session_id: (headers["X-Komoju-ID"] ||
              headers["x-komoju-id"]) as string,
          },
        })
        res.status(500).json({
          result: false,
          message: error.message || "An unknown error occurred.",
        })
      }

      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default webhookHandler

export const config = {
  api: {
    bodyParser: false,
  },
}
