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
    id: "event003",
    title: "Degree Maila",
    subtitle: "Tokyo",
    description:
      "",
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
    dateStart: getTimestamp('2024-04-29 18:00:00'),
    dateEnd: getTimestamp('2024-04-29 23:59:59'),
    dateGateOpen: getTimestamp('2024-04-29 17:00:00'),
    dateTicketSalesStart: getTimestamp('2024-04-14 00:00:00'),
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/degree-maila.jpg",
    notices: [],
    tickets: [
      {
        id: "ticket011",
        title: "Students",
        description: "Discounted ticker for students.",
        price: 2500,
        stripePriceId:
        isProduction
            ? "price_1P5MP2BE6fqNwbhoIa6U2qH0"
            : "price_1P5M4HBE6fqNwbhoPUpcrccT",
        available: true,
        maximumNumberOfTicketsAvailable: 500,
        dateTicketSalesStart: getTimestamp('2024-04-14 00:00:00'),
      },
      {
        id: "ticket012",
        title: "General Ticket",
        description: "General price tickets",
        price: 3000,
        stripePriceId:
        isProduction
            ? "price_1P5MOSBE6fqNwbhoCoarnrAI"
            : "price_1P5M59BE6fqNwbhoYfH1yIju",
        available: true,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: getTimestamp('2024-04-14 00:00:00'),
      },
    ],
  },

  {
    id: "event004",
    title: "Degree Maila",
    subtitle: "Yokohama",
    description:
      "",
    venue: {
      id: "venue004",
      title: "Nishi Koukhaido Hall",
      description: "",

      address: {
        id: "address004",
        postalCode: "220-0073",
        prefecture: "Kanagawa",
        city: "Nishi-ku",
        addressLine1: "Yokohama 1-6-41",
      },
      access: "10 minutes walk from Yokohama Station",
    },
    dateStart: getTimestamp('2024-04-21 18:30:00'),
    dateEnd: getTimestamp('2024-04-21 23:59:59'),
    dateGateOpen: getTimestamp('2024-04-21 18:00:00'),
    dateTicketSalesStart: getTimestamp('2024-04-14 00:00:00'),
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/degree-maila.jpg",
    notices: [],
    tickets: [
      {
        id: "ticket011",
        title: "Students",
        description: "Discounted ticker for students.",
        price: 2500,
        stripePriceId:
        isProduction
            ? "price_1P5MP2BE6fqNwbhoIa6U2qH0"
            : "price_1P5M4HBE6fqNwbhoPUpcrccT",
        available: true,
        maximumNumberOfTicketsAvailable: 500,
        dateTicketSalesStart: getTimestamp('2024-04-14 00:00:00'),
      },
    ],
  },
]

function getTimestamp(date: MomentInput) {
  return moment.tz(date, 'Asia/Tokyo').unix();
}