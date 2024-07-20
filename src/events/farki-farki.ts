import { admins } from "../config/admins"
import { Event } from "../config/events"
import { getTimestamp, isProduction } from "../utils"

export const farkiFarki: Event = {
  id: "event007",
  slug: "farki-farki",
  title: "Farki Farki with Anmol KC",
  subtitle: "Tokyo show",
  description:
    "The story unfolds as a time-traveling love saga. In this enchanting tale love transcends boundaries.",
  admin: [admins.suvash, admins.asim],
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
  ogImage: "/images/farki-farki-og-image.jpeg",
  notices: ["Red carpet premiere with Anmol KC!"],
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
      available: false,
      maximumNumberOfTicketsAvailable: 1000,
      dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
    },
    {
      id: "ticket022",
      title: "VIP",
      description: "Free dinner with Anmol KC",
      price: 10000,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1PLQ1dBE6fqNwbhoL9VvtA0S"
        : "price_1PLQ1wBE6fqNwbhoYCGEgkju",
      available: false,
      maximumNumberOfTicketsAvailable: 500,
      dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
    },
    {
      id: "ticket021",
      title: "Student",
      description: "Discounted ticket for students",
      price: 2500,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1PHyZFBE6fqNwbhox3v8CQ0l"
        : "price_1PHybSBE6fqNwbhoyVyD8xQr",
      available: false,
      maximumNumberOfTicketsAvailable: 500,
      dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
    },
  ],
}
