import Link from "next/link"
import { useRouter } from "next/router"
import { EventList } from "@/src/components"
import moment from "moment"
import { getServerSession } from "next-auth/next"

import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { authOptions } from "../api/auth/[...nextauth]"

export default function IndexPage(props) {
  const { result } = props
  const router = useRouter()

  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="flex max-w-[980px] flex-col items-start gap-3 md:gap-4">
          <h1 className="text-lg font-extrabold leading-tight tracking-tighter text-slate-800 dark:text-slate-200 sm:text-xl md:text-2xl lg:text-2xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-[700px] text-base text-slate-700 dark:text-slate-400 sm:text-base">
            {siteConfig.description}
          </p>
        </div>
        <div>
          {result === "success" ? (
            <h3 className="text-2xl text-slate-700">Payment successful!</h3>
          ) : (
            <h3 className="text-2xl text-red-600">Payment failed!</h3>
          )}
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions)
  console.log(query)
  const { result } = query
  return {
    props: { sessionData: session, result }, // will be passed to the page component as props
  }
}
