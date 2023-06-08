import type { NextApiRequest, NextApiResponse } from "next"
import { encodePassword } from "@/src/utils/auth"
import { DB } from "@/src/utils/db"
import { IdentifierType } from "@prisma/client"
import { parsePhoneNumber } from "libphonenumber-js"
import moment from "moment"

export interface VerifyParams {
  type: IdentifierType
  mobile: string
  code: string
}

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "POST":
      try {
        const { type, mobile, code }: Partial<VerifyParams> = body

        const parsedMobile = parsePhoneNumber(mobile, "JP")
        // check if user is already registered
        const existingUser = await DB.user.findFirst({
          where: {
            mobile: parsedMobile.number,
            mobileVerified: null,
            deletedAt: null,
          },
          select: { id: true },
        })

        if (!existingUser) {
          res
            .status(404)
            .json({ error: true, code: "0005", message: "User not found." })
          return
        }

        const verificationData = await DB.verificationRequest.findFirst({
          where: {
            identifier: mobile.trim(),
            type,
            deletedAt: null,
          },
          orderBy: {
            createdAt: "desc",
          },
        })

        if (!verificationData) {
          res.status(404).json({
            error: true,
            code: "0005",
            message: "Invalid mobile number.",
          })
          return
        }

        if (verificationData.token !== code) {
          res
            .status(404)
            .json({ error: true, code: "0006", message: "Invalid code." })
          return
        }

        if (moment().isAfter(moment(verificationData.expires))) {
          res
            .status(404)
            .json({ error: true, code: "0007", message: "Code expired." })
          return
        }

        // everything looks fine, now mark the user's mobileVerified column not null
        await DB.user.update({
          where: { id: existingUser.id },
          data: { mobileVerified: moment().toDate() },
        })

        await DB.verificationRequest.delete({
          where: { id: verificationData.id },
        })

        res
          .status(200)
          .json({ result: true, message: "Verification successful." })
      } catch (error) {}

      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)

      break
  }
}

export default registerHandler
