import { getTimestamp, isProduction } from "@/src/utils"

export type Event = {
  id: string
  title: string
  slug: string
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
  mapLink?: string
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
    slug: "1974ad-live-in-tokyo",
    title: "1974AD Original Lineup",
    subtitle: "Live in Tokyo",
    description:
      "Original lineup of the legendary band from Nepal, 1974AD performing live in Tokyo, Japan.",
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
        mapLink: "https://maps.app.goo.gl/HV9K9iFey9HPDXk26",
      },
      access: "16 minute walk from Shinkiba Station",
    },
    dateStart: getTimestamp("2024-07-27 18:00:00"),
    dateEnd: getTimestamp("2024-07-27 22:00:00"),
    dateGateOpen: getTimestamp("2024-07-27 15:00:00"),
    dateTicketSalesStart: getTimestamp("2024-05-01 00:00:00"),
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/1974-ad.jpg",
    notices: ["Early birds tickets sale ending soon!"],
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
    id: "event007",
    slug: "farki-farki",
    title: "Farki Farki",
    subtitle: "Tokyo show",
    description:
      "Starring Anmol KC and Jassita Gurung in the lead roles, the movie is set against the backdrop of mystical elements. The story unfolds as a time-traveling love saga. Love transcends boundaries, and in this enchanting tale, it knows no limits.",
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
        mapLink: "https://maps.app.goo.gl/AyT9g3iV5eM83zAt5",
      },
      access: "5 minute walk from Nakano Station",
    },
    dateStart: getTimestamp("2024-06-09 18:30:00"),
    dateEnd: getTimestamp("2024-06-09 23:59:59"),
    dateGateOpen: getTimestamp("2024-06-09 18:00:00"),
    dateTicketSalesStart: getTimestamp("2024-05-01 00:00:00"),
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/farki-farki.jpg",
    notices: [],
    tickets: [
      {
        id: "ticket020",
        title: "General",
        description: "General price tickets",
        price: 3000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PHyZFBE6fqNwbhoKRqCxWBJ"
          : "price_1PHybSBE6fqNwbhoZaIC2fON",
        available: true,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket021",
        title: "Student",
        description: "Discuonted ticket for students",
        price: 2500,
        numberOfTickets: 4,
        stripePriceId: isProduction
          ? "price_1PHyZFBE6fqNwbhox3v8CQ0l"
          : "price_1PHybSBE6fqNwbhoyVyD8xQr",
        available: true,
        maximumNumberOfTicketsAvailable: 500,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
    ],
  },
]
