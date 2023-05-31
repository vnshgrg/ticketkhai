import Link from "next/link"
import { useRouter } from "next/router"
import { EventList } from "@/src/components"
import moment from "moment"
import { getServerSession } from "next-auth/next"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { authOptions } from "./api/auth/[...nextauth]"

export default function IndexPage(props) {
  const { sessionData } = props
  const router = useRouter()
  const { t } = useTranslation("common")
  let content = (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          router.push("/login")
        }}
        className={buttonVariants({ variant: "subtle", size: "lg" })}
      >
        {t("auth-login")}
      </Button>
      <Button
        onClick={() => {
          router.push("/register")
        }}
        className={buttonVariants({ variant: "subtle", size: "lg" })}
      >
        {t("auth-register")}
      </Button>
    </div>
  )

  if (sessionData) {
    const { user, expires } = sessionData
    const { name, mobile } = user
    content = (
      <div>
        <p className="font-medium">
          {t("welcome")} {name},
        </p>
        <p className="pt-4">
          <Link href="/user/my-tickets">
            <span className="mt-4 font-bold">{t("nav-mypage")}</span>
          </Link>
        </p>
      </div>
    )
  }

  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="flex max-w-[980px] flex-col items-start gap-3 md:gap-4">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tighter text-slate-800 dark:text-slate-200 sm:text-3xl md:text-5xl lg:text-6xl">
            {t("site-name")}
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            {t("site-subtitle")}
          </p>
        </div>

        {content}

        <EventList />
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions)
  return {
    props: { sessionData: session, message: "hello" }, // will be passed to the page component as props
  }
}
