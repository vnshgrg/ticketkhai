import Link from "next/link"
import { GoogleTagManager } from "@next/third-parties/google"
import useTranslation from "next-translate/useTranslation"

import { SiteHeader } from "@/src/components/site-header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation("common")
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col mt-16">
        <div className="hero-wrapper">
          <div className="hero">
            <div className="hero-mask" />
          </div>
        </div>
        <div className="relative">{children}</div>
      </main>
      <footer className="mt-10 border-t border-slate-100 py-6 text-center text-sm text-slate-600">
        <p className="mb-4 space-x-10">
          <Link href="/">{t("nav-home")}</Link>
          <Link href="/compliance/special-commercial-transaction-act">
            {t("nav-scta")}
          </Link>
          <Link href="/compliance/contact">{t("nav-contact")}</Link>
        </p>
        <p>&copy; copyright 2023. Ticketkhai.com</p>
        <GoogleTagManager gtmId="GTM-KNDQPG8S" />
      </footer>
    </>
  )
}
