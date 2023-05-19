import type { NextApiRequest, NextApiResponse } from "next"
import { encodePassword } from "@/src/utils/auth"
import { DB } from "@/src/utils/db"
import { IdentifierType } from "@prisma/client"
import { parsePhoneNumber } from "libphonenumber-js"
import moment from "moment"

import { demoEvents } from "@/src/config/events"

export interface VerifyParams {
  id: string
}

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "GET":
      try {
        const { id }: Partial<VerifyParams> = body

        const filteredDemoEvents = demoEvents.filter(
          (event) => id === event.id
        )[0]

        if (filteredDemoEvents) {
          res
            .status(200)
            .json({ result: true, message: "", data: filteredDemoEvents })
        } else {
          res.status(400).json({ result: false, message: "Event not found." })
        }
      } catch (error) {
        res
          .status(500)
          .json({
            result: false,
            message: error.message || "An unknown error occurred.",
          })
      }

      break
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${method} Not Allowed`)

      break
  }
}

export default registerHandler
