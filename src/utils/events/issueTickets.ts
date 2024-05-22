import { KomojuStatus, TicketStatus, User } from "@prisma/client"

import { siteConfig } from "@/src/config/site"
import { DB } from "../db"
import { isProduction } from "../environment"
import { sendSlackMessage, formatTicketSoldSlackMessage } from "../slack"
import { sendSMS } from "../sms"

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
      if(isProduction){
        await sendSMS({
          provider: "twilio",
          message: `Your ticket purchase is complete. Visit: ${siteConfig.baseurl}`,
          to: user.mobile,
        })
      }

      await sendSlackMessage(
        formatTicketSoldSlackMessage({eventName: eventId, quantity, transactionId, ticketType: ticketTypeId})
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  } catch (error) {
    console.log(error)
  }
}
