import { getTimestamp, isProduction } from "@/src/utils"

import { admins } from "./admins"

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

export const demoEvents: Event[] = [
  {
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
  },
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
    photo: "/images/1974-ad-sold.jpg",
    confirmPurchase: {
      title: "1974AD Live in Tokyo",
      subtitle: "Tokyo",
      description:
        "The ticket you are trying to purchase is for TOKYO concert. Are you sure you want to continue with your order?",
    },
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
        available: false,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket019",
        title: "Early birds second phase",
        description: "Limited discounted price tickets",
        price: 4500,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PJlk2BE6fqNwbhobYzZbqlV"
          : "price_1PJlikBE6fqNwbhoyRg53tEe",
        available: false,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket016",
        title: "Standard",
        description: "General ticket for single person entry",
        price: 5000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PHaDcBE6fqNwbhonOxrekhx"
          : "price_1PHa1CBE6fqNwbho3Y2fG9CB",
        available: false,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket017",
        title: "Couple",
        description: "Discounted ticket for couples",
        price: 9000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PHaDcBE6fqNwbhoFKmUMUmN"
          : "price_1PHa1CBE6fqNwbhofcjg69Xm",
        available: false,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket018",
        title: "VIP",
        description:
          "VIP ticket for single person entry, includes Free exclusive event T-shirt, VIP wrist-band, 1 Free drink",
        price: 10000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PHaDcBE6fqNwbhopGmlyEg6"
          : "price_1PHa1CBE6fqNwbhockSeOhrO",
        available: true,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
    ],
  },
  {
    id: "event008",
    slug: "1974ad-live-in-kyoto",
    admin: [admins.samil],
    title: "1974AD Original Lineup",
    subtitle: "Live in Kyoto",
    description:
      "Original lineup of the legendary band from Nepal, 1974AD performing live in Kyoto, Japan.",
    venue: {
      id: "venue005",
      title: "KBS Hall",
      description: "",
      address: {
        id: "address005",
        postalCode: "602-8588",
        prefecture: "Kyoto",
        city: "Kamigyo",
        addressLine1: "Karasumakamichojamachi, KBS Kyoto Broadcasting Hall",
        mapLink: "https://maps.app.goo.gl/F6qzKnAYfK8Yw1UZ6",
      },
      access: "8 minutes walk from Marutamachi Station, Exit 2 (left)",
    },
    dateStart: getTimestamp("2024-08-03 17:00:00"),
    dateEnd: getTimestamp("2024-08-03 23:00:00"),
    dateGateOpen: getTimestamp("2024-08-03 15:00:00"),
    dateTicketSalesStart: getTimestamp("2024-05-01 00:00:00"),
    maximumNumberOfTicketsAvailable: 1000,
    photo: "/images/1974-ad-kyoto.jpg",
    confirmPurchase: {
      title: "1974AD Live in Kyoto",
      subtitle: "Kyoto",
      description:
        "The ticket you are trying to purchase is for KYOTO concert. Are you sure you want to continue with your order?",
    },
    tickets: [
      {
        id: "ticket023",
        title: "Early birds",
        description: "Limited discounted price tickets",
        price: 3000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PMXMiBE6fqNwbhoN5ZK5nFC"
          : "price_1PMXJiBE6fqNwbhoR464Cnue",
        available: false,
        maximumNumberOfTicketsAvailable: 1000,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket024",
        title: "Standard",
        description: "General ticket for single person with two free drinks",
        price: 5000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PR3FqBE6fqNwbhoVQ4Kgzfu"
          : "price_1PR3EeBE6fqNwbhoaMU87Y0a",
        available: true,
        maximumNumberOfTicketsAvailable: 200,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
      {
        id: "ticket025",
        title: "Couple",
        description: "Discounted ticket for couples with three free drinks",
        price: 9000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PR3G5BE6fqNwbhoZz8glluZ"
          : "price_1PR3FKBE6fqNwbhoMxRjwpLe",
        available: true,
        maximumNumberOfTicketsAvailable: 100,
        dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
      },
    ],
  },

  {
    id: "event009",
    slug: "jatl-fukuoka",
    admin: [admins.avinash],
    title: "John & The Locals",
    subtitle: "Live in Fukuoka",
    description:
      "John & The Locals for the first time in Japan with their Manai Dekhin 2024 World Tour.",
    venue: {
      id: "venue006",
      title: "UNITEDLAB",
      description: "",
      address: {
        id: "address006",
        postalCode: "810-0041",
        prefecture: "Fukuoka",
        city: "Chuo-Ku",
        addressLine1: "Daimyo 1-3-36",
        mapLink: "https://maps.app.goo.gl/pZo7BL41Fow3r9Q19",
      },
      access: "7 minutes walk from Tenjin Station",
    },
    dateStart: getTimestamp("2024-09-07 17:00:00"),
    dateEnd: getTimestamp("2024-09-07 22:00:00"),
    dateGateOpen: getTimestamp("2024-09-07 15:00:00"),
    dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    maximumNumberOfTicketsAvailable: 1500,
    photo: "/images/jatl/jatl-fukuoka.jpg",
    ogImage: "/images/jatl/jatl-fukuoka-og.jpg",
    notices: ["Early birds tickets now on sale!"],
    confirmPurchase: {
      title: "John & The Locals Live in Fukuoka",
      subtitle: "Fukuoka",
      description:
        "The ticket you are trying to purchase is for FUKUOKA show. Are you sure you want to continue with your order?",
    },
    tickets: [
      {
        id: "ticket026",
        title: "Early birds ticket",
        description: "Limited discounted price ticket",
        price: 4500,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PeGesBE6fqNwbhog2OwoSFM"
          : "price_1PeGb0BE6fqNwbhoQRkjYCpx",
        available: true,
        maximumNumberOfTicketsAvailable: 500,
        dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
      },
      {
        id: "ticket027",
        title: "Standard ticket",
        description: "General ticket for single person",
        price: 5000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PeGesBE6fqNwbhoadTRxt0x"
          : "price_1PeGb0BE6fqNwbhoYDS4GqxE",
        available: false,
        maximumNumberOfTicketsAvailable: 500,
        dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
      },
      {
        id: "ticket028",
        title: "Couple ticket",
        description: "Discounted ticket for two people",
        price: 9000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PeGesBE6fqNwbhoQoWTmW03"
          : "price_1PeGb0BE6fqNwbhoQCZKgjEq",
        available: false,
        maximumNumberOfTicketsAvailable: 300,
        dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
      },
      {
        id: "ticket029",
        title: "VIP Ticket",
        description: "Special VIP ticket with free T-shirt & 1 drink",
        price: 10000,
        numberOfTickets: 1,
        stripePriceId: isProduction
          ? "price_1PeGesBE6fqNwbhojxaLIipH"
          : "price_1PeGb0BE6fqNwbhoqXdvSfuM",
        available: false,
        maximumNumberOfTicketsAvailable: 200,
        dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
      },
    ],
  },
]
