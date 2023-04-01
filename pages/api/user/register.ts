import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { encodePassword } from "@/src/utils/auth"
import { DB } from "@/src/utils/db"
import { randomNumber } from "@/src/utils/randomNumber"
import { sendSMS } from "@/src/utils/sms"
import { parsePhoneNumber } from "libphonenumber-js"
import moment from "moment"

export interface UserCreateParams {
  email: string
  password: string
  name: string
  mobile: string
}

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "POST":
      const { name, password, mobile }: Partial<UserCreateParams> = body
      // check if user is already registered
      const existingUser = await DB.user.findFirst({
        where: {
          OR: [{ mobile: mobile.trim() }],
        },
        select: { id: true },
      })

      if (existingUser) {
        res
          .status(400)
          .json({ error: true, code: "0001", message: "User already exists." })
        return
      }

      const parsedMobile = parsePhoneNumber(mobile, "JP")

      if (!parsedMobile.isValid()) {
        res.status(400).json({
          error: true,
          code: "0004",
          message: "Invalid mobile number.",
        })
        return
      }

      const providerAccountId = randomUUID()

      // Update or create data in your database
      const { id: newUserId, verificationRequests } = await DB.user.create({
        data: {
          name,
          mobile: parsedMobile.number,
          password: encodePassword(password),
          verificationRequests: {
            create: {
              identifier: parsedMobile.number,
              token: randomNumber(4),
              type: "mobile",
              expires: moment().add(24, "hours").toDate(),
            },
          },
        },
        select: {
          id: true,
          verificationRequests: true,
        },
      })

      const { token, identifier, type, key } = verificationRequests[0]

      try {
        await sendSMS({
          provider: "twilio",
          message: `${token} is your TicketKhai verification code.`,
          to: identifier,
        })
      } catch (error) {
        console.log(error)
      }

      res.status(200).json({
        result: true,
        message: "Registration successful.",
        data: { identifier, type, key },
      })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default registerHandler
