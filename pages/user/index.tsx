import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Layout, UserLayout } from "@/src/components"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/src/config/site"

export default function ProfilePage() {
  const router = useRouter()
  const { status, data } = useSession()

  let content = null
  if (status === "loading") [(content = <div>Loading...</div>)]
  if (status === "unauthenticated") {
    router.push("/error/unauthorized")
  }

  return (
    <Layout>
      <Head>
        <title>{siteConfig.name}</title>
      </Head>
      <UserLayout>
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Hello {data?.user?.name},
          </h1>
        </div>
      </UserLayout>
    </Layout>
  )
}
