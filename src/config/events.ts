import { farkiFarki } from "../events/farki-farki"
import { jatlFukuoka, jatlOsaka } from "../events/jatl"
import {
  nineteenSeventyFourAdKyoto,
  nineteenSeventyFourAdTokyo,
} from "../events/nineteen-seventy-four-ad"

export type ConfirmPurchase = {
  title: string
  subtitle: string
  description: string
}

export type Event = {
  id: string
  title: string
  slug: string
  subtitle: string
  description: string
  photo?: string
  ogImage?: string
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
  confirmPurchase?: ConfirmPurchase
  admin?: string[]
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

const pastEvents: Event[] = [farkiFarki]
const currentEvents: Event[] = [
  jatlFukuoka,
  jatlOsaka,
  nineteenSeventyFourAdKyoto,
  nineteenSeventyFourAdTokyo,
]

export const events: Event[] = [...currentEvents, ...pastEvents]
