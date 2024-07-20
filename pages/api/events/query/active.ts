import type { NextApiRequest, NextApiResponse } from "next"
import { activeEvents } from "@/src/utils/temp"

export interface VerifyParams {
  page: number
  filters: any
}

const activeEventsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "GET":
      try {
        const { page }: Partial<VerifyParams> = body

        res
          .status(200)
          .json({ result: true, message: "", data: activeEvents() })
      } catch (error) {}

      break
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${method} Not Allowed`)

      break
  }
}

export default activeEventsHandler
