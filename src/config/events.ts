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
    id: "event001",
    title: "Sabin Rai & The Pharaoh",
    subtitle: "Tokyo",
    description:
      "Our artist (Sabin Rai & The Pharaoh) for this event is one of the best Nepali bands of the current music scenario. With their back-to-back hit songs released, there is almost no Nepalese in the world who does not know about this band and their songs. They have performed concerts various countries. This is going to be their 1st time to perform in Japan as a band.",
    venue: {
      id: "venue001",
      title: "SHIBUYA STREAM HALL",
      description: "",
      address: {
        id: "address001",
        postalCode: "150-0002",
        prefecture: "Tokyo",
        city: "Shibuya-ku",
        addressLine1: "Shibuya ３-２１-３",
      },
      access: "1 minute walk from Shibuya Station",
    },
    dateStart: 1689411600,
    dateEnd: 1689426000,
    dateGateOpen: 1689404400,
    dateTicketSalesStart: 1685113200,
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/sratp-tokyo.jpg",
    notices: ["Early birds ticket sold out!"],
    tickets: [
      // {
      //   id: "ticket001",
      //   title: "Early Birds Ticket",
      //   description: "Early bird tickets at discounted price.",
      //   price: 3500,
      //   stripePriceId:
      //     process.env.ENV === "production"
      //       ? "price_1NBJoABE6fqNwbho8fWyC7xX"
      //       : "price_1NCKQMBE6fqNwbhoNI0o4XA0",
      //   available: true,
      //   maximumNumberOfTicketsAvailable: 100,
      //   dateTicketSalesStart: 1682866800,
      //   dateTicketSalesEnd: 1685545199,
      // },
      {
        id: "ticket002",
        title: "Standard Ticket",
        description: "Standard price tickets",
        price: 4500,
        stripePriceId:
          process.env.ENV === "production"
            ? "price_1NCKGHBE6fqNwbhon6th1MTg"
            : "price_1NCKQfBE6fqNwbhoH4kKvfSg",
        available: true,
        maximumNumberOfTicketsAvailable: 600,
        dateTicketSalesStart: 1685545200,
      },
      {
        id: "ticket003",
        title: "VIP Ticket",
        description: "VIP price tickets",
        price: 10000,
        stripePriceId:
          process.env.ENV === "production"
            ? "price_1NCKGeBE6fqNwbhoITSQZkOv"
            : "price_1NCKQuBE6fqNwbho4UOuNwIx",
        available: true,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: 1685545200,
      },
    ],
  },
]
