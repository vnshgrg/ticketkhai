import { Event, events } from "@/src/config/events"

export const eventById = (eventId: string): Event => {
  try {
    const filteredDemoEvent = events.filter((event) => eventId === event.id)[0]
    if (!filteredDemoEvent) {
      // throw new Error("No even found")
      return null
    }
    return filteredDemoEvent
  } catch (error) {
    throw new Error(error.message)
  }
}

export const eventBySlug = (slug: string): Event => {
  try {
    const filteredDemoEvent = events.filter((event) => slug === event.slug)[0]
    if (!filteredDemoEvent) {
      // throw new Error("No even found")
      return null
    }
    return filteredDemoEvent
  } catch (error) {
    throw new Error(error.message)
  }
}
