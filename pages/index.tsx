import Head from "next/head"
import Link from "next/link"
import moment from "moment"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/src/config/site"
import { Layout } from "@/src/components/layout"
import { buttonVariants } from "@/src/components/ui/button"

export default function IndexPage() {
  const { status, data } = useSession()
  let content = (
    <div className="flex gap-4">
      <Link
        href="/login"
        rel="noreferrer"
        className={buttonVariants({ variant: "primary", size: "lg" })}
      >
        Login
      </Link>
      <Link
        href="/register"
        rel="noreferrer"
        className={buttonVariants({ variant: "primary", size: "lg" })}
      >
        Register
      </Link>
    </div>
  )

  if (status === "loading") [(content = <div>Loading...</div>)]
  if (status === "authenticated") {
    const { name, email, mobile } = data.user
    content = (
      <div>
        <p className="font-medium">Welcome {name},</p>
        <p className="text-sm">Mobile: {mobile}</p>
        <p className="text-sm">
          Session expires {moment(data.expires).fromNow()}
        </p>
      </div>
    )
  }

  return (
    <Layout>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:gap-8 md:py-20">
        <div className="flex max-w-[980px] flex-col items-start gap-4 md:gap-6">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-indigo-800 dark:text-indigo-200 sm:text-3xl md:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            {siteConfig.description}
          </p>
        </div>

        {content}
      </section>
    </Layout>
  )
}
