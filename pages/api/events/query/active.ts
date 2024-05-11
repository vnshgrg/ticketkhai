import type { NextApiRequest, NextApiResponse } from "next"

import { demoEvents } from "@/src/config/events"

export interface VerifyParams {
  page: number
  filters: any
}

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "GET":
      try {
        const { page }: Partial<VerifyParams> = body

        res.status(200).json({ result: true, message: "", data: demoEvents })
      } catch (error) {}

      break
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${method} Not Allowed`)

      break
  }
}

export default registerHandler
