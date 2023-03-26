import { NavItem } from "@/src/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    facebook: string
    instagram: string
    linkedin: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Japan Recruitment Group",
  description:
    "Recruitment and staffing service for foreigners living in Japan",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
}
