import Head from "next/head"
import { useRouter } from "next/router"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "../config/site"

interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
}
export const Seo = ({ title, description, image }: SeoProps) => {
  const { lang } = useTranslation()
  const seo = {
    title: title ? `${title} - ${siteConfig.name}` : siteConfig.name,
    description: description ?? siteConfig.description,
    image: image ? `${siteConfig.baseurl}${image}` : null,
    locale: lang === "jp" ? "ja-JP" : "en-US",
  }

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content={seo.locale} />
    </Head>
  )
}
