import type { NextApiRequest, NextApiResponse } from "next"
import { isProduction } from "@/src/utils"
import { DB } from "@/src/utils/db"
import { randomNumber } from "@/src/utils/randomNumber"
import { sendSMS } from "@/src/utils/sms"
import { parsePhoneNumber } from "libphonenumber-js"
import moment from "moment-timezone"

export interface ForgotPasswordParams {
  username: string
}

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "POST":
      const { username: rawMobile }: Partial<ForgotPasswordParams> = body

      const parsedMobile = parsePhoneNumber(rawMobile, "JP")

      if (!parsedMobile.isValid()) {
        res.status(400).json({
          error: true,
          code: "0004",
          message: "Invalid mobile number.",
        })
        return
      }

      const mobile = parsedMobile.number

      // check if user is already registered
      const existingUser = await DB.user.findFirst({
        where: {
          mobile,
        },
        select: { id: true, mobileVerified: true },
      })

      if (!existingUser) {
        res.status(400).json({
          error: true,
          code: "0001",
          message: "Mobile number is not registered",
        })
        return
      }

      if (!existingUser.mobileVerified) {
        res.status(400).json({
          error: true,
          code: "0001",
          message: "Mobile number is not verified",
        })
        return
      }

      let verificationRequestData: {
        identifier: string
        token: string
      }

      const verificationRequestSelect = {
        id: true,
        token: true,
        identifier: true,
      }

      const now = moment().utc().toDate()

      // check if user already has a valid verification code
      const existingVerificationCode = await DB.verificationRequest.findFirst({
        where: {
          userId: existingUser.id,
          expires: { gt: now },
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: verificationRequestSelect,
      })

      if (existingVerificationCode) {
        verificationRequestData = existingVerificationCode
      } else {
        // Update or create data in your database
        const { verificationRequests: newVerificationRequest } =
          await DB.user.update({
            where: { id: existingUser.id },
            data: {
              verificationRequests: {
                create: {
                  identifier: mobile,
                  token: randomNumber(4),
                  type: "mobile",
                  expires: moment().add(24, "hours").toDate(),
                },
              },
            },
            select: { verificationRequests: true },
          })

        verificationRequestData = newVerificationRequest[0]
      }

      const { identifier, token } = verificationRequestData

      try {
        const message = `${token} is your TicketKhai verification code.`
        if (isProduction) {
          await sendSMS({
            provider: "twilio",
            message,
            to: identifier,
          })
        } else {
          console.log(message)
        }
      } catch (error) {
        res.status(500).json({
          result: false,
          message: "Could not send verification code.",
        })
        return
      }

      res.status(200).json({
        result: true,
        message: "Verification code sent.",
        data: { identifier },
      })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default registerHandler
