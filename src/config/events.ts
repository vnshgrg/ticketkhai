import moment from "moment-timezone"
import { MomentInput } from "moment"
import {isProduction} from "@/src/utils"


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
    id: "event004",
    title: "Royal Rock Fest.",
    subtitle: "BarChord & The We (Hami)",
    description:
      "",
    venue: {
      id: "venue004",
      title: "Royal Gardel Lounge & Bar",
      description: "",

      address: {
        id: "address004",
        postalCode: "169-0073",
        prefecture: "Tokyo",
        city: "Shinjuku-ku",
        addressLine1: "Hyakunincho 2-17-11, B1",
      },
      access: "4 minute walk from Okubo/Shin-Okubo Station",
    },
    dateStart: getTimestamp('2024-05-05 19:00:00'),
    dateEnd: getTimestamp('2024-05-05 23:59:59'),
    dateGateOpen: getTimestamp('2024-05-05 18:00:00'),
    dateTicketSalesStart: getTimestamp('2024-04-14 00:00:00'),
    maximumNumberOfTicketsAvailable: 300,
    photo: "/images/royal-rock-fest.png",
    notices: [],
    tickets: [
      {
        id: "ticket012",
        title: "General",
        description: "With Free Drink",
        price: 1500,
        stripePriceId:
        isProduction
            ? "price_1P96zSBE6fqNwbhoVkXV87Ls"
            : "price_1P970PBE6fqNwbhoZQ8aQqKL",
        available: true,
        maximumNumberOfTicketsAvailable: 300,
        dateTicketSalesStart: getTimestamp('2024-04-14 00:00:00'),
      }
    ],
  },
]

function getTimestamp(date: MomentInput) {
  return moment.tz(date, 'Asia/Tokyo').unix();
}