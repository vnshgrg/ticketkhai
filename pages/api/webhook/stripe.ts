import type { NextApiRequest, NextApiResponse } from "next"
import { DB } from "@/src/utils/db"
import { sendSMS } from "@/src/utils/sms"
import { FaceSmileIcon } from "@heroicons/react/20/solid"
import { KomojuStatus, TicketStatus } from "@prisma/client"
import Stripe from "stripe"

import { siteConfig } from "@/src/config/site"
import { webhookPayloadParser } from "@/src/lib/stripe"

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2022-11-15",
})

export interface VerifyParams {
  page: number
  filters: any
}

const stripeWebhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, headers } = req
  const duplicateRequest = req

  switch (method) {
    case "POST":
      try {
        const body: string = await webhookPayloadParser(req)
        const { headers } = req
        const signature =
          headers["stripe-signature"] || headers["Stripe-Signature"]

        // verify webhook signature
        const WHK = process.env.STRIPE_WHK

        const hook: any = stripe.webhooks.constructEvent(body, signature, WHK)

        if (
          hook.type !== "checkout.session.completed" &&
          hook.type !== "checkout.session.expired"
        ) {
          res.status(404).json({ result: false, message: "Not found" })
          return
        }

        // based on type switch case
        switch (hook.type) {
          case "checkout.session.completed":
            // check transaction for verification
            const { amount_total: amount, metadata: completeMetadata } =
              hook.data.object

            // get transaction
            const transaction = await DB.transaction.findUnique({
              where: { id: completeMetadata.transactionId },
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
                  type: hook.type,
                  data: hook,
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
                  type: hook.type,
                  data: hook,
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
                  type: hook.type,
                  data: hook,
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
                message: `Your ticket purchase is complete. Visit: ${siteConfig.baseurl}`,
                to: userTickets.mobile,
              })
            } catch (error) {
              console.log(error)
            }

            res.status(200).json({ result: true, message: "Tickets issued." })
            return
            // respond good
            break

          case "checkout.session.expired":
            const { metadata: expiredMetadata } = hook.data.object
            await DB.transaction.update({
              where: { id: completeMetadata.transactionId },
              data: {
                status: KomojuStatus.expired,
              },
            })
            res
              .status(200)
              .json({ result: true, message: "Transaction marked as expired." })
            break
        }

        res.status(200).json({ result: true, message: "success" })
      } catch (error) {
        console.log(error)
        await DB.webhook.create({
          data: {
            result: false,
            result_message: error.message || "An unknown error occurred.",
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

export default stripeWebhookHandler

export const config = {
  api: {
    bodyParser: false,
  },
}
