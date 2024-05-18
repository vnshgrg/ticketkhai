import { Event, demoEvents } from "@/src/config/events"
import { getTimestamp } from "../strings"

export const activeEvents = (): Event[] => {
  const now = getTimestamp(new Date())
  const filteredDemoEvent = demoEvents.filter(({ dateEnd }) => dateEnd >= now)
  if (!filteredDemoEvent) {
    // throw new Error("No even found")
    return null
  }
  return filteredDemoEvent
}
