import { admins } from "../config/admins"
import { Event } from "../config/events"
import { getTimestamp, isProduction } from "../utils"

export const nineteenSeventyFourAdTokyo: Event = {
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
  notices: ["Sold out!"],
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
      available: false,
      maximumNumberOfTicketsAvailable: 1000,
      dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
    },
  ],
}

export const nineteenSeventyFourAdKyoto: Event = {
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
  notices: [
    "Online ticket sale ended.",
    "Limited door tickets available on the day.",
  ],
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
      available: false,
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
      available: false,
      maximumNumberOfTicketsAvailable: 100,
      dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
    },
    {
      id: "ticket0255",
      title: "VIP",
      description: "VIP tag with a front row seat, T-shirt & 2 Drinks",
      price: 10000,
      numberOfTickets: 1,
      stripePriceId: isProduction
        ? "price_1PMXMtBE6fqNwbhoKzaCLtn3"
        : "price_1PMXK8BE6fqNwbhotC2opWkJ",
      available: false,
      maximumNumberOfTicketsAvailable: 200,
      dateTicketSalesStart: getTimestamp("2024-04-14 00:00:00"),
    },
  ],
}
