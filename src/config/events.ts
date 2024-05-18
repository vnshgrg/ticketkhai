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
    id: "event006",
    title: "1974AD Original Lineup",
    subtitle: "Live in Tokyo",
    description: "",
    venue: {
      id: "venue004",
      title: "GARDEN新木場FACTORY",
      description: "",

      address: {
        id: "address004",
        postalCode: "136-0082",
        prefecture: "Tokyo",
        city: "Koto-ku",
        addressLine1: "Shinkiba 2-8-2",
      },
      access: "16 minute walk from Shinkiba Station",
    },
    dateStart: getTimestamp("2024-07-27 18:00:00"),
    dateEnd: getTimestamp("2024-07-27 22:00:00"),
    dateGateOpen: getTimestamp("2024-07-27 15:00:00"),
    dateTicketSalesStart: getTimestamp("2024-05-01 00:00:00"),
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/1974-ad.jpg",
    notices: ["Early birds tickets on sale now!"],
    tickets: [
      {
        id: "ticket015",
        title: "Early birds",
        description: "Limited discounted price tickets",
        price: 4000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PHaDcBE6fqNwbhoE7sSCZwh"
          : "price_1PHa1CBE6fqNwbhoOf0eRwWb",
        available: true,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      // {
      //   id: "ticket016",
      //   title: "Standard",
      //   description: "General ticket for single person entry",
      //   price: 5000,
      //   numberOfTickets: 1,
      //   stripePriceId: isProduction
      //     ? "price_1PHaDcBE6fqNwbhonOxrekhx"
      //     : "price_1PHa1CBE6fqNwbho3Y2fG9CB",
      //   available: true,
      //   maximumNumberOfTicketsAvailable: 1000,
      //   dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      // },
      // {
      //   id: "ticket017",
      //   title: "Couple",
      //   description: "Discounted ticket for couples",
      //   price: 9000,
      //   numberOfTickets: 1,
      //   stripePriceId: isProduction
      //     ? "price_1PHaDcBE6fqNwbhoFKmUMUmN"
      //     : "price_1PHa1CBE6fqNwbhofcjg69Xm",
      //   available: true,
      //   maximumNumberOfTicketsAvailable: 1000,
      //   dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      // },
      // {
      //   id: "ticket018",
      //   title: "VIP",
      //   description:
      //     "VIP ticket for single person entry, includes Free exclusive event T-shirt, VIP wrist-band, 1 Free drink",
      //   price: 10000,
      //   numberOfTickets: 1,
      //   stripePriceId: isProduction
      //     ? "price_1PHaDcBE6fqNwbhopGmlyEg6"
      //     : "price_1PHa1CBE6fqNwbhockSeOhrO",
      //   available: true,
      //   maximumNumberOfTicketsAvailable: 1000,
      //   dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      // },
    ],
  },
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
