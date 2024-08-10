import { admins } from "../config/admins"
import { Event } from "../config/events"
import { getTimestamp, isProduction } from "../utils"

export const jatlFukuoka: Event = {
  id: "event009",
  slug: "jatl-fukuoka",
  admin: [admins.avinash, admins.jivan],
  title: "John & The Locals",
  subtitle: "Live in Fukuoka",
  description:
    "John & The Locals for the first time in Japan with their Mutu Dekhin 2024 World Tour.",
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
  notices: ["Early birds tickets sold out!"],
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
      available: false,
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
      available: true,
      maximumNumberOfTicketsAvailable: 500,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
    {
      id: "ticket028",
      title: "Couple ticket",
      description: "Discounted ticket for two people",
      price: 9000,
      numberOfTickets: 2,
      stripePriceId: isProduction
        ? "price_1PeGesBE6fqNwbhoQoWTmW03"
        : "price_1PeGb0BE6fqNwbhoQCZKgjEq",
      available: true,
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
      available: true,
      maximumNumberOfTicketsAvailable: 200,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
  ],
}

export const jatlOsaka: Event = {
  id: "event010",
  slug: "jatl-osaka",
  admin: [admins.avinash, admins.biraj],
  title: "John & The Locals",
  subtitle: "Live in Osaka",
  description:
    "John & The Locals for the first time in Japan with their Mutu Dekhin 2024 World Tour.",
  venue: {
    id: "venue007",
    title: "Daito Bunka Hall",
    description: "",
    address: {
      id: "address007",
      postalCode: "574-0037",
      prefecture: "Osaka",
      city: "Daito-Shi",
      addressLine1: "Shinmachi 13-30",
      mapLink: "https://maps.app.goo.gl/zs97eYPeqYmTYbqR7",
    },
    access: "7 minutes walk from Suminodou Station",
  },
  dateStart: getTimestamp("2024-09-08 17:00:00"),
  dateEnd: getTimestamp("2024-09-08 22:00:00"),
  dateGateOpen: getTimestamp("2024-09-08 15:00:00"),
  dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
  maximumNumberOfTicketsAvailable: 1500,
  photo: "/images/jatl/jatl-osaka.jpg",
  ogImage: "/images/jatl/jatl-osaka-og.jpg",
  notices: ["Early birds tickets sold out!"],
  confirmPurchase: {
    title: "John & The Locals Live in Osaka",
    subtitle: "Osaka",
    description:
      "The ticket you are trying to purchase is for OSAKA show. Are you sure you want to continue with your order?",
  },
  tickets: [
    {
      id: "ticket030",
      title: "Early birds ticket",
      description: "Limited discounted price ticket",
      price: 3500,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1PkOlBBE6fqNwbho31u5SwLM"
        : "price_1PkOdTBE6fqNwbhoTyy0Me3A",
      available: false,
      maximumNumberOfTicketsAvailable: 500,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
    {
      id: "ticket031",
      title: "Standard ticket",
      description: "General ticket for single person",
      price: 4500,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1PkOlBBE6fqNwbhobsK75Oqm"
        : "price_1PkOdTBE6fqNwbhoOqaDwUNn",
      available: true,
      maximumNumberOfTicketsAvailable: 500,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
    {
      id: "ticket032",
      title: "Couple ticket",
      description: "Discounted ticket for two people",
      price: 8000,
      numberOfTickets: 2,
      stripePriceId: isProduction
        ? "price_1PkOlBBE6fqNwbhoYGiU0RyQ"
        : "price_1PkOdTBE6fqNwbhokY4r7FpH",
      available: true,
      maximumNumberOfTicketsAvailable: 300,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
  ],
}

export const jatlTokyo: Event = {
  id: "event011",
  slug: "jatl-tokyo",
  admin: [admins.avinash, admins.dipesh],
  title: "John & The Locals",
  subtitle: "Live in Tokyo",
  description:
    "John & The Locals for the first time in Japan with their Mutu Dekhin 2024 World Tour.",
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
  dateStart: getTimestamp("2024-09-14 17:00:00"),
  dateEnd: getTimestamp("2024-09-14 22:00:00"),
  dateGateOpen: getTimestamp("2024-09-14 15:00:00"),
  dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
  maximumNumberOfTicketsAvailable: 1500,
  photo: "/images/jatl/jatl-tokyo.jpg",
  ogImage: "/images/jatl/jatl-tokyo-og.jpg",
  notices: ["Early birds tickets on sale!"],
  confirmPurchase: {
    title: "John & The Locals Live in Tokyo",
    subtitle: "Tokyo",
    description:
      "The ticket you are trying to purchase is for TOKYO show. Are you sure you want to continue with your order?",
  },
  tickets: [
    {
      id: "ticket040",
      title: "Early birds ticket",
      description: "Limited discounted price ticket",
      price: 5000,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1Pm9bqBE6fqNwbhoba66FjXG"
        : "price_1Pm9biBE6fqNwbhoeQVay5Tb",
      available: false,
      maximumNumberOfTicketsAvailable: 500,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
    {
      id: "ticket041",
      title: "Standard ticket",
      description: "General ticket for single person",
      price: 6000,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1Pm9bqBE6fqNwbhoGHPufAMq"
        : "price_1Pm9biBE6fqNwbhoujAmZEgr",
      available: true,
      maximumNumberOfTicketsAvailable: 500,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
    {
      id: "ticket042",
      title: "Couple ticket",
      description: "Discounted ticket for two people",
      price: 11000,
      numberOfTickets: 2,
      stripePriceId: isProduction
        ? "price_1Pm9bqBE6fqNwbho2yWZrN2q"
        : "price_1Pm9biBE6fqNwbhoVzxlbK58",
      available: true,
      maximumNumberOfTicketsAvailable: 300,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
    {
      id: "ticket043",
      title: "VIP ticket",
      description: "VIP ticket including dinner with John & the Locals",
      price: 15000,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1Pm9bqBE6fqNwbhoykOOYk2R"
        : "price_1Pm9biBE6fqNwbhoNEpLeSm6",
      available: true,
      maximumNumberOfTicketsAvailable: 300,
      dateTicketSalesStart: getTimestamp("2024-08-20 00:00:00"),
    },
  ],
}
