export type Event = {
  id: string
  title: string
  subtitle: string
  description: string
  photo?: string[]
  venue: Venue
  dateStart: number
  dateEnd: number
  dateGateOpen: number
  maximumNumberOfTicketsAvailable: number
  tickets: Ticket[]
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
    title: "Sabin Rai & The Pharaoh: Japan Tour",
    subtitle: "Tokyo",
    description:
      'Sabin Rai is a Nepali singer and lyricist who is called as the Bryan Adams of Nepal because of the voice. His first successful single was "Komal Tyo Timro" from the album Sataha. Although his song "Ekai Aakash Muni" was released before Sataha.',
    venue: {
      id: "venue001",
      title: "GARDEN Shinkiba FACTORY",
      description:
        "Garden Shinkiba Factory is a vast studio for filming and photography that opened in May 2021, boasting a total floor space of over 1,300 square meters. The studio’s high ceilings and warehouse atmosphere make the space ideal for various events such as fashion shows and product exhibitions.",
      address: {
        id: "address001",
        postalCode: "136-0082",
        prefecture: "Tokyo",
        city: "Koto-ku",
        addressLine1: "Shinkiba 2-8-2",
      },
      access: "新木場駅（JR /りんかい線/有楽町線）より徒歩16分",
    },
    dateStart: 1688194800,
    dateEnd: 1688216400,
    dateGateOpen: 1688198400,
    dateTicketSalesStart: 1682866800,
    maximumNumberOfTicketsAvailable: 1500,
    tickets: [
      {
        id: "ticket001",
        title: "Early Bird",
        description: "Early bird tickets at discounted price.",
        price: 3500,
        available: true,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: 1682866800,
        dateTicketSalesEnd: 1685545199,
      },
      {
        id: "ticket002",
        title: "Standard",
        description: "Standard price tickets",
        price: 5000,
        available: true,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: 1685545200,
      },
      {
        id: "ticket003",
        title: "VIP",
        description: "VIP price tickets",
        price: 10000,
        available: true,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: 1685545200,
      },
    ],
  },
]
