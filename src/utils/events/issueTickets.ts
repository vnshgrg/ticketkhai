import { KomojuStatus, TicketStatus, User } from "@prisma/client"

import { siteConfig } from "@/src/config/site"
import { DB } from "../db"
import { isProduction } from "../environment"
import { formatTicketSoldSlackMessage, sendSlackMessage } from "../slack"
import { sendSMS } from "../sms"
import { eventById, ticketById } from "../temp"

export type IssueTicketParams = {
  eventId: string
  ticketTypeId: string
  quantity: number
  transactionId: string
  user: Pick<User, "id" | "mobile">
  hook: any
}

export type IssueTicket = ({
  eventId,
  ticketTypeId,
  quantity,
  transactionId,
  user,
  hook,
}: IssueTicketParams) => Promise<void>

export const issueTicket: IssueTicket = async ({
  eventId,
  ticketTypeId,
  quantity,
  transactionId,
  user,
  hook,
}) => {
  try {
    // issue tickets
    // generate ticket metadata
    let ticketsMetadata = []
    for (let i = 1; i <= quantity; i++) {
      ticketsMetadata.push({
        eventId,
        ticketTypeId,
        userId: user.id,
        status: TicketStatus.available,
        transactionId,
        upatedAt: new Date(),
      })
    }

    await DB.$transaction([
      DB.transaction.update({
        where: { id: transactionId },
        data: {
          status: KomojuStatus.captured,
        },
      }),
      DB.ticket.createMany({
        data: ticketsMetadata,
      }),
      DB.webhook.create({
        data: {
          type: "completed",
          data: hook,
          result: true,
          result_message: "Tickets issued.",
        },
      }),
    ])

    try {
      if (isProduction) {
        await sendSMS({
          provider: "twilio",
          message: `Your ticket purchase is complete. Visit: ${siteConfig.baseurl}`,
          to: user.mobile,
        })
      }

      const event = eventById(eventId)
      const ticket = ticketById(eventId, ticketTypeId)
      const numberOfTickets = ticket.numberOfTickets ?? 1 // Couple ticket has 2 tickets per purchase, defaults to 1
      const reportingQuantity = quantity / numberOfTickets

      await sendSlackMessage(
        formatTicketSoldSlackMessage({
          event,
          ticket,
          quantity: reportingQuantity,
        })
      )
    } catch (error) {
      throw error
    }
  } catch (error) {
    console.log(error)
  }
}
