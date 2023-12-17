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
    id: "event002",
    title: "DONG live in Tokyo",
    subtitle: "Tokyo",
    description:
      "Gazzab entertainment presents DONG live in Tokyo. Let's celebrate the start of the year with one of the most successful rapper of Nepal.",
    venue: {
      id: "venue002",
      title: "Nightclub WARP SHINJUKU",
      description: "",

      address: {
        id: "address001",
        postalCode: "160-0021",
        prefecture: "Tokyo",
        city: "Shinjuku-ku",
        addressLine1: "Kabukicho 1 Chome−21−1 B1",
      },
      access: "5 minute walk from Shinjuku Station",
    },
    dateStart: 1704528000,
    dateEnd: 1704546000,
    dateGateOpen: 1704524400,
    dateTicketSalesStart: 1702833550,
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/dong-tokyo.jpg",
    notices: [],
    tickets: [
      {
        id: "ticket001",
        title: "Early Birds Ticket",
        description: "Early bird tickets at discounted price.",
        price: 3500,
        stripePriceId:
          process.env.ENV === "production"
            ? "price_1OONu3BE6fqNwbhoAabhkksw"
            : "price_1OOO0kBE6fqNwbho7G3Af08U",
        available: true,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: 1702833421,
        dateTicketSalesEnd: 1704553200,
      },
      {
        id: "ticket002",
        title: "General Ticket",
        description: "General price tickets",
        price: 4000,
        stripePriceId:
          process.env.ENV === "production"
            ? "price_1OONuqBE6fqNwbhoWM4fz4YR"
            : "price_1OOO11BE6fqNwbhoaUEG0oe0",
        available: true,
        maximumNumberOfTicketsAvailable: 200,
        dateTicketSalesStart: 1702833421,
      },
      {
        id: "ticket003",
        title: "Standard Ticket",
        description: "Standard tickets",
        price: 5000,
        stripePriceId:
          process.env.ENV === "production"
            ? "price_1OONvpBE6fqNwbhowIcEn7S9"
            : "price_1OOO1eBE6fqNwbhoQaOmwDsd",
        available: true,
        maximumNumberOfTicketsAvailable: 200,
        dateTicketSalesStart: 1702833421,
      },
      {
        id: "ticket004",
        title: "VIP Ticket",
        description: "VIP tickets",
        price: 10000,
        stripePriceId:
          process.env.ENV === "production"
            ? "price_1OONx9BE6fqNwbhos4ppPM3u"
            : "price_1OOO25BE6fqNwbho11NofRzq",
        available: true,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: 1702833421,
      },
    ],
  },
]
