import axios from "axios"

import { Event, Ticket } from "../config/events"
import { formatJPY } from "./strings"

const SLACK_WH_URL = process.env.SLACK_WH_URL || null

export async function sendSlackMessage(message: any) {
  if (!SLACK_WH_URL) {
    console.log(`No Slack webhook URL found!`)
    return
  }

  try {
    const config = {
      method: "post",
      url: SLACK_WH_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(message),
    }
    await axios.request(config)
  } catch (error) {
    console.log(error)
    return
  }
}

type TicketSoldSlackNotificationPayload = {
  event: Event
  quantity: number
  transactionId: string
  ticket: Ticket
}
export function formatTicketSoldSlackMessage({
  event,
  quantity,
  transactionId,
  ticket,
}: TicketSoldSlackNotificationPayload) {
  return {
    blocks: [
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Ticket sold: ",
              },
              {
                type: "text",
                text: `${event.title} - ${event.subtitle}`,
                style: {
                  bold: true,
                },
              },
            ],
          },
        ],
      },
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_list",
            style: "bullet",
            indent: 0,
            border: 0,
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  {
                    type: "text",
                    text: `Transaction ID: ${transactionId}`,
                  },
                ],
              },
              {
                type: "rich_text_section",
                elements: [
                  {
                    type: "text",
                    text: `Quantity: ${quantity}`,
                  },
                ],
              },
              {
                type: "rich_text_section",
                elements: [
                  {
                    type: "text",
                    text: `Ticket Type: ${ticket.title}`,
                  },
                ],
              },
              {
                type: "rich_text_section",
                elements: [
                  {
                    type: "text",
                    text: `Ticket Price: ${formatJPY(ticket.price)}`,
                  },
                ],
              },
              {
                type: "rich_text_section",
                elements: [
                  {
                    type: "text",
                    text: `Total: ${formatJPY(ticket.price * quantity)}`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
}
