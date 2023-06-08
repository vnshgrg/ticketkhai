import type { NextApiRequest, NextApiResponse } from "next"
import { DB } from "@/src/utils/db"
import { fulFillOrder, issueTicket } from "@/src/utils/events"
import { sendSMS } from "@/src/utils/sms"
import { KomojuStatus } from "@prisma/client"
import Stripe from "stripe"

import { siteConfig } from "@/src/config/site"
import { getCustomerById, webhookPayloadParser } from "@/src/lib/stripe"

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

        if (hook.type === "checkout.session.async_payment_succeeded") {
          const result = await fulFillOrder(hook)
          res.status(200).json(result)
          return
        } else if (hook.type === "checkout.session.completed") {
          const checkoutCompleteSession = hook.data.object
          const { transactionId } = checkoutCompleteSession.metadata

          if (checkoutCompleteSession.payment_status !== "paid") {
            // update transaction
            const { user } = await DB.transaction.update({
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
            try {
              await sendSMS({
                provider: "twilio",
                message: `Your ticket purchase is awaiting payment. Pay now: ${siteConfig.baseurl}`,
                to: user.mobile,
              })
            } catch (error) {
              console.log(error.message)
            }

            await DB.webhook.create({
              data: {
                result: true,
                result_message: "",
                type: hook.type,
                data: checkoutCompleteSession as any,
              },
            })

            res.status(200).json({
              result: true,
              message: "Checkout session awaiting payment.",
            })
            return
          }

          const result = await fulFillOrder(hook)

          res.status(200).json(result)
          return
        } else if (hook.type === "checkout.session.async_payment_failed") {
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
        } else if (hook.type === "checkout.session.expired") {
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
          return
        } else if (hook.type === "payment_intent.partially_funded") {
          const paymentIntent = hook.data.object
          // check transaction for verification
          const { next_action, customer } = paymentIntent

          // get customer from stripe to get userID
          const stripeCustomer = (await getCustomerById(
            customer as string
          )) as Stripe.Customer

          // get user's mobile number
          const {
            metadata: { userId },
          } = stripeCustomer

          const user = await DB.user.findUnique({
            where: { id: userId },
            select: { mobile: true },
          })

          if (
            next_action?.display_bank_transfer_instructions?.amount_remaining >
            0
          ) {
            // send SMS
            const { amount_remaining } =
              next_action.display_bank_transfer_instructions

            const parsedAmountRemaining = new Intl.NumberFormat("ja-JP", {
              style: "currency",
              currency: "JPY",
            }).format(amount_remaining)
            const textMessage = {
              to: user.mobile,
              message: `Partial payment received. Transfer ${parsedAmountRemaining} to complete payment.`,
            }
            try {
              await sendSMS({ provider: "twilio", ...textMessage })
            } catch (error) {
              console.log("Error at sendSMS", error.message)
            }
            res.status(200).json({
              result: false,
              message: "Checkout session incomplete due to partial funding.",
            })
            return
          }

          res.status(200).json({
            result: false,
            message: "Checkout session incomplete.",
          })
          return
        } else {
          res.status(404).json({ result: false, message: "Not found" })
          return
        }
      } catch (error) {
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
