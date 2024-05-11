import type { NextApiRequest, NextApiResponse } from "next"
import { eventById } from "@/src/utils/temp"

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

        const event = eventById(id)

        if (event) {
          res.status(200).json({ result: true, message: "", data: event })
        } else {
          res.status(400).json({ result: false, message: "Event not found." })
        }
      } catch (error) {
        res.status(500).json({
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
