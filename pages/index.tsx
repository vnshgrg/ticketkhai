import Link from "next/link"
import { useRouter } from "next/router"
import { EventList } from "@/src/components"
import moment from "moment"
import { getServerSession } from "next-auth/next"

import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { authOptions } from "./api/auth/[...nextauth]"

export default function IndexPage(props) {
  const { sessionData } = props
  const router = useRouter()
  let content = (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          router.push("/login")
        }}
        className={buttonVariants({ variant: "subtle", size: "lg" })}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          router.push("/register")
        }}
        className={buttonVariants({ variant: "subtle", size: "lg" })}
      >
        Register
      </Button>
    </div>
  )

  if (sessionData) {
    const { user, expires } = sessionData
    const { name, mobile } = user
    content = (
      <div>
        <p className="font-medium">Welcome {name},</p>
        <p className="text-sm">Mobile: {mobile}</p>
        <p className="text-sm">Session expires {moment(expires).fromNow()}</p>
        <Link href="/user/my-tickets">
          <span className="mt-4 block font-bold">Go to My Page</span>
        </Link>
      </div>
    )
  }

  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="flex max-w-[980px] flex-col items-start gap-3 md:gap-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-slate-800 dark:text-slate-200 sm:text-3xl md:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            {siteConfig.description}
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
  console.log(session)
  return {
    props: { sessionData: session, message: "hello" }, // will be passed to the page component as props
  }
}
