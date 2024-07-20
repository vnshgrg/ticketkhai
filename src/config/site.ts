import { NavItem } from "@/src/types/nav"

interface SiteConfig {
  baseurl: string
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    facebook: string
    instagram: string
    linkedin: string
  }
  fees: {
    handlingFee: number | null
    paymentFee: number | null
    tax: number | null
  }
}

export const siteConfig: SiteConfig = {
  baseurl: process.env.NEXT_PUBLIC_SITE_URL,
  name: process.env.NEXT_PUBLIC_SITENAME,
  description: "buy tickets online",
  mainNav: [
    {
      title: "Home",
      key: "nav-home",
      href: "/",
    },
    {
      title: "My Tickets",
      key: "nav-mytickets",
      href: "/user/tickets",
    },
    {
      title: "Contact",
      key: "nav-contact",
      href: "/compliance/contact",
    },
  ],
  links: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
  fees: {
    handlingFee: null,
    paymentFee: null,
    tax: null,
  },
}
