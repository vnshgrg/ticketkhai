import type { NextApiRequest, NextApiResponse } from "next"
import { DB } from "@/src/utils/db"
import { eventById, ticketById } from "@/src/utils/temp"
import { getServerSession } from "next-auth/next"

import { authOptions } from "../../auth/[...nextauth]"

export interface BuyTicketParams {
  eventId: string
  ticketId: string
  noOfTickets: number
}

const myTicektsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "GET":
      try {
        const session = await getServerSession(req, res, authOptions)
        // Get user from session

        if (!session || !session.user) {
          res.status(401).end(`Unauthorized`)
          return
        }

        const { user } = session
        // update transaction with komoju session
        const { tickets } = await DB.user.findUnique({
          where: { id: user.id },
          select: {
            tickets: true,
          },
        })

        const populatedTickets = tickets.map((ticket) => {
          return {
            ...ticket,
            event: eventById(ticket.eventId),
            ...ticketById(ticket.eventId, ticket.ticketTypeId),
          }
        })

        res
          .status(200)
          .json({ result: true, message: "success", data: populatedTickets })
        return
      } catch (error) {
        res.status(500).json({
          result: false,
          error: error?.message || "An unknown error occurred.",
        })
        return
      }

      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)

      break
  }
}

export default myTicektsHandler
