import type { NextApiRequest, NextApiResponse } from "next"
import { DB } from "@/src/utils/db"
import { eventById, ticketById } from "@/src/utils/temp"
import { TicketStatus } from "@prisma/client"
import { getServerSession } from "next-auth/next"

import { authOptions } from "../auth/[...nextauth]"

export interface BuyTicketParams {
  eventId: string
  ticketId: string
  noOfTickets: number
}

const myTicektsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method } = req

  const session = await getServerSession(req, res, authOptions)
  // Get user from session

  if (!session || !session.user || session.user.role !== "admin") {
    res.status(401).end(`Unauthorized`)
    return
  }

  const { id } = req.query

  if (!id) {
    res.status(400).end(`Badrequest`)
    return
  }

  switch (method) {
    case "GET":
      try {
        const ticket = await DB.ticket.findUnique({
          where: { id: id as string },
          include: { user: true, transaction: true },
        })

        if (!ticket) {
          res.status(404).json({ result: false, message: "Ticket not found!" })
          return
        }

        const populatedTickets = {
          ...ticket,
          event: eventById(ticket.eventId),
          ...ticketById(ticket.eventId, ticket.ticketTypeId),
          id,
        }

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

    case "PATCH":
      try {
        // check if ticket is available
        const { status } = await DB.ticket.findUnique({
          where: { id: id as string },
          select: { status: true },
        })

        if (status !== "available") {
          res.status(401).end(`Ticket already used!`)
          return
        }

        const ticket = await DB.ticket.update({
          where: {
            id: id as string,
          },
          data: {
            status: TicketStatus.used,
            upatedAt: new Date(),
          },
          include: { user: true, transaction: true },
        })

        const populatedTickets = {
          ...ticket,
          event: eventById(ticket.eventId),
          ...ticketById(ticket.eventId, ticket.ticketTypeId),
          id,
        }

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
      res.setHeader("Allow", ["GET", "PATCH"])
      res.status(405).end(`Method ${method} Not Allowed`)

      break
  }
}

export default myTicektsHandler
