import { KomojuStatus } from "@prisma/client"
import _ from "lodash"
import moment from "moment"

import { DB } from "../db"
import { eventById, ticketById } from "../temp"

export const listAvailableTickets = async (userId) => {
  try {
    const transactions = await DB.transaction.findMany({
      where: { userId, status: KomojuStatus.captured },
      select: {
        id: true,
        eventId: true,
        ticketTypeId: true,
        unitPrice: true,
        quantity: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tickets: {
          select: {
            id: true,
            status: true,
            ticketTypeId: true,
            createdAt: true,
            upatedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const populatedTransactions = transactions.map((transaction) => {
      return {
        ...transaction,
        event: eventById(transaction.eventId),
        tickets: transaction.tickets.map((ticket) => {
          return {
            ...ticket,
            ..._.omit(ticketById(transaction.eventId, ticket.ticketTypeId), [
              "id",
            ]),
            createdAt: moment(ticket.createdAt).unix(),
            upatedAt: moment(ticket.upatedAt).unix(),
          }
        }),
        createdAt: moment(transaction.createdAt).unix(),
        updatedAt: moment(transaction.updatedAt).unix(),
      }
    })
    return populatedTransactions
  } catch (error) {
    console.log(error)
    return []
  }
}
