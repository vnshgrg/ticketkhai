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
    <div className="flex gap-x-4">
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
      <div className="space-y-2">
        <p className="font-medium">
          {t("welcome")} {name},
        </p>
        <p className="">
          <Link href="/user/my-tickets">
            <span className="mt-4 font-bold">{t("nav-mypage")}</span>
          </Link>
        </p>
      </div>
    )
  }

  return (
    <Layout>
      <div className="mx-auto min-w-[28rem] max-w-md">
        <div className="flex flex-col space-y-4 px-5 py-10">
          <div>
            <h1 className="grow text-lg font-extrabold leading-tight tracking-tighter text-slate-800 dark:text-slate-200 sm:text-xl md:text-2xl lg:text-3xl">
              {t("site-name")}
            </h1>
            <p className="grow text-lg text-slate-700 dark:text-slate-400 sm:text-lg">
              {t("site-subtitle")}
            </p>
          </div>
          <div>{content}</div>
          <EventList />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions)
  return {
    props: { sessionData: session }, // will be passed to the page component as props
  }
}
