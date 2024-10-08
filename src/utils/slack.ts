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
    return
  }
}

type TicketSoldSlackNotificationPayload = {
  event: Event
  quantity: number
  ticket: Ticket
}
export function formatTicketSoldSlackMessage({
  event,
  quantity,
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
                text: `${event.title} - ${event.subtitle}`,
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
                    text: `Type: ${ticket.title} (${formatJPY(ticket.price)})`,
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
