import { isProduction } from "@/src/utils"
import { MomentInput } from "moment"
import moment from "moment-timezone"

export type Event = {
  id: string
  title: string
  subtitle: string
  description: string
  photo?: string
  venue: Venue
  dateStart: number
  dateEnd: number
  dateGateOpen: number
  maximumNumberOfTicketsAvailable: number
  tickets: Ticket[]
  notices?: string[]
  dateTicketSalesStart?: number
  dateTicketSalesEnd?: number
  extraNotes?: string
}

export type Venue = {
  id: string
  title: string
  description: string
  address: Address
  access: string
}

export type Address = {
  id
  postalCode: string
  prefecture: string
  city: string
  addressLine1: string
  addressLine2?: string
  tel?: string
  email?: string
  lat?: number
  lng?: number
}

export type Ticket = {
  id: string
  title: string
  description: string
  price: number
  numberOfTickets: number
  stripePriceId: string
  available: boolean
  photo?: string[]
  color?: string
  dateTicketSalesStart?: number
  dateTicketSalesEnd?: number
  discountPrice?: number
  discountPriceStartDateTime?: number
  discountPriceEndDateTime?: number
  maximumNumberOfTicketsAvailable?: number
}

export const demoEvents: Event[] = [
  {
    id: "event005",
    title: "Boksi Ko Ghar",
    subtitle: "Tokyo",
    description: "",
    venue: {
      id: "venue003",
      title: "Nakano Zero Hall",
      description: "",

      address: {
        id: "address003",
        postalCode: "164-0001",
        prefecture: "Tokyo",
        city: "Nakano-ku",
        addressLine1: "Nakano 2-9-7",
      },
      access: "5 minute walk from Nakano Station",
    },
    dateStart: getTimestamp("2024-05-19 18:00:00"),
    dateEnd: getTimestamp("2024-05-19 23:59:59"),
    dateGateOpen: getTimestamp("2024-05-19 17:00:00"),
    dateTicketSalesStart: getTimestamp("2024-05-01 00:00:00"),
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/boksi-ko-ghar.jpg",
    notices: [],
    tickets: [
      {
        id: "ticket012",
        title: "General",
        description: "General price tickets",
        price: 3000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1P5MOSBE6fqNwbhoCoarnrAI"
          : "price_1P5M59BE6fqNwbhoYfH1yIju",
        available: true,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket014",
        title: "Family",
        description: "4 tickets at discuonted price",
        price: 10000,
        numberOfTickets: 4,
        stripePriceId: isProduction
          ? "price_1PCEZABE6fqNwbho6Xs7Gx35"
          : "price_1PCEZhBE6fqNwbhoWlmNzW9V",
        available: true,
        maximumNumberOfTicketsAvailable: 500,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
    ],
  },
]

function getTimestamp(date: MomentInput) {
  return moment.tz(date, "Asia/Tokyo").unix()
}
