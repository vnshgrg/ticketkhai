import type { NextApiRequest, NextApiResponse } from "next"
import { isProduction } from "@/src/utils"
import { encodePassword } from "@/src/utils/auth"
import { DB } from "@/src/utils/db"
import { randomNumber } from "@/src/utils/randomNumber"
import { sendSMS } from "@/src/utils/sms"
import { IdentifierType } from "@prisma/client"
import { parsePhoneNumber } from "libphonenumber-js"
import moment from "moment-timezone"

export interface ChangeForgottenPasswordParams {
  identifier: string
  token: string
  password: string
}

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "POST":
      const {
        identifier,
        token,
        password,
      }: Partial<ChangeForgottenPasswordParams> = body

      // check if user is already registered
      const user = await DB.user.findFirst({
        where: {
          mobile: identifier,
        },
        select: { id: true, mobileVerified: true },
      })

      if (!user) {
        res.status(400).json({
          error: true,
          code: "0001",
          message: "Mobile number is not registered",
        })
        return
      }

      if (!user.mobileVerified) {
        res.status(400).json({
          error: true,
          code: "0001",
          message: "Mobile number is not verified",
        })
        return
      }

      // check if user already has a valid verification code
      const verificationCodeMatch = await DB.verificationRequest.findFirst({
        where: {
          identifier: identifier,
          token,
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: { id: true },
      })

      if (!verificationCodeMatch) {
        res.status(400).json({
          error: true,
          code: "0001",
          message: "Verification code do not match",
        })
        return
      }

      if (password.length < 6) {
        res.status(400).json({
          error: true,
          code: "0001",
          message: "Password should be at least 6 character long",
        })
        return
      }

      await DB.user.update({
        where: { id: user.id },
        data: {
          password: encodePassword(password),
        },
      })

      // delete verification code
      await DB.verificationRequest.delete({
        where: { id: verificationCodeMatch.id },
      })

      res.status(200).json({
        result: true,
        message: "Password changed",
      })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default registerHandler
