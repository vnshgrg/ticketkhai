import { Ticket } from "@/src/config/events"
import { eventById } from "./event-by-id"

export const ticketById = (eventId: string, ticketId: string): Ticket => {
  try {
    const event = eventById(eventId)
    const filteredTicket = event.tickets.filter(
      (ticket) => ticket.id === ticketId
    )[0]

    if (!filteredTicket) {
      // throw new Error("Ticket not found.")
      return null
    }
    return filteredTicket
  } catch (error) {
    throw new Error(error.message)
  }
}
