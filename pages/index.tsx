import { useRouter } from "next/router"
import { EventList, Seo, Skeleton } from "@/src/components"
import { activeEvents } from "@/src/utils/temp"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { Layout } from "@/src/components/layout"
import { Button, buttonVariants } from "@/src/components/ui/button"

export default function IndexPage({ events }) {
  const { t } = useTranslation("common")

  return (
    <Layout>
      <Seo />
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col space-y-5 sm:space-y-8 p-5 sm:py-8">
          <div className="bg-white/40 border border-white/50 rounded-xl p-3">
            <UserContent />
          </div>
          <EventList events={events} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const events = activeEvents()
  return {
    props: { events },
  }
}

const UserContentLoadingSkeleton = () => {
  return (
    <Skeleton>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-start sm:items-center justify-between">
        <div className="rounded bg-slate-200 w-60 sm:w-96 h-6" />
        <div className="flex flex-row space-x-4">
          <div className="rounded bg-slate-200 w-20 h-10" />
          <div className="rounded bg-slate-200 w-20 h-10" />
        </div>
      </div>
    </Skeleton>
  )
}

const UserContent = () => {
  const { data, status } = useSession()
  const router = useRouter()
  const { t } = useTranslation("common")

  if (status === "loading") {
    return <UserContentLoadingSkeleton />
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-baseline justify-between">
        <p>Get started by registering an account.</p>
        <div className="flex flex-row space-x-4">
          <Button
            type="button"
            onClick={() => {
              router.push("/login")
            }}
            className={buttonVariants({ variant: "link" })}
          >
            {t("auth-login")}
          </Button>
          <Button
            type="button"
            onClick={() => {
              router.push("/register")
            }}
            className={buttonVariants({ variant: "default" })}
          >
            {t("auth-register")}
          </Button>
        </div>
      </div>
    )
  }

  const {
    user: { name },
  } = data
  return (
    <div className="flex flex-col sm:flex-row items-baseline justify-between space-y-3 sm:space-y-0">
      <p className="font-medium">
        {t("welcome")} {name},
      </p>
      <Button
        type="button"
        onClick={() => {
          router.push("/user/tickets")
        }}
      >
        {t("nav-mytickets")}
      </Button>
    </div>
  )
}
