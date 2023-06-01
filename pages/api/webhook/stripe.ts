import type { NextApiRequest, NextApiResponse } from "next"
import { issueTicket, sendSMS } from "@/src/utils"
import { DB } from "@/src/utils/db"
import { KomojuStatus } from "@prisma/client"
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

  switch (method) {
    case "POST":
      try {
        const body: string = await webhookPayloadParser(req)
        const signature =
          headers["stripe-signature"] || headers["Stripe-Signature"]

        // verify webhook signature
        const WHK = process.env.STRIPE_WHK

        const hook = stripe.webhooks.constructEvent(
          body,
          signature,
          WHK
        ) as Stripe.DiscriminatedEvent

        console.log(hook)

        if (
          hook.type !== "checkout.session.async_payment_succeeded" &&
          hook.type !== "checkout.session.async_payment_failed" &&
          hook.type !== "checkout.session.expired" &&
          hook.type !== "checkout.session.completed"
        ) {
          res.status(404).json({ result: false, message: "Not found" })
          return
        }

        // based on type switch case
        switch (hook.type) {
          case "checkout.session.async_payment_succeeded":
            const checkoutSession = hook.data.object
            // check transaction for verification
            const { amount_total: amount, metadata: completeMetadata } =
              checkoutSession

            // get transaction
            const transaction = await DB.transaction.findUnique({
              where: { id: completeMetadata.transactionId },
              include: {
                user: {
                  select: { id: true, mobile: true },
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
                  data: hook as any,
                  result: false,
                  result_message:
                    "Amount did not match. Something is fishy so declining this request.",
                },
              })
              res.status(200).json({
                result: false,
                message:
                  "Amount did not match. Something is fishy so declining this request.",
              })
              return
            }

            // check if payment intent is complete

            // fulfill order
            await issueTicket({
              eventId,
              ticketTypeId,
              quantity,
              transactionId: completeMetadata.transactionId,
              user,
              hook: checkoutSession as any,
            })

            res.status(200).json({ result: true, message: "Tickets issued." })
            return
            // respond good
            break
          case "checkout.session.completed":
            const checkoutCompleteSession = hook.data.object
            const { transactionId } = checkoutCompleteSession.metadata
            // update transaction
            await DB.transaction.update({
              where: { id: transactionId },
              data: {
                status: KomojuStatus.authorized,
              },
              select: {
                user: {
                  select: { id: true, mobile: true },
                },
              },
            })
            if (checkoutCompleteSession.payment_status !== "paid") {
              try {
                await sendSMS({
                  provider: "twilio",
                  message: `Your ticket purchase is await payment. Pay now by visiting ${siteConfig.baseurl}`,
                  to: user.mobile,
                })
              } catch (error) {
                console.log(error.message)
              }
            }

            break

          case "checkout.session.async_payment_failed":
            const failedCheckoutSession = hook.data.object
            await recordWebhook({
              transactionId: failedCheckoutSession.metadata.transactionId,
              transactionData: { status: KomojuStatus.failed },
              webhookData: {
                result: false,
                result_message: "Checkout session payment failed.",
                data: failedCheckoutSession,
              },
            })
            res
              .status(200)
              .json({ result: true, message: "Transaction expired." })
            break

          case "checkout.session.expired":
            const expiredCheckoutSession = hook.data.object
            await recordWebhook({
              transactionId: expiredCheckoutSession.metadata.transactionId,
              transactionData: { status: KomojuStatus.expired },
              webhookData: {
                result: false,
                result_message: "Checkout session expired.",
                data: expiredCheckoutSession,
              },
            })
            res
              .status(200)
              .json({ result: true, message: "Transaction expired." })
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

const recordWebhook = async ({
  transactionId,
  transactionData,
  webhookData,
}: {
  transactionId: string
  transactionData: any
  webhookData: any
}): Promise<void> => {
  await DB.$transaction([
    DB.webhook.create({
      data: webhookData,
    }),
    DB.transaction.update({
      where: { id: transactionId },
      data: transactionData,
    }),
  ])
}
