import Head from "next/head"
import Link from "next/link"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Layout, UserLayout } from "@/src/components"
import { getServerSession } from "next-auth/next"

import { isEventAdmin } from "@/src/config/admins"
import { demoEvents } from "@/src/config/events"
import { siteConfig } from "@/src/config/site"

const AdminPage = ({ events }) => {
  return (
    <Layout>
      <Head>
        <title>{siteConfig.name}</title>
      </Head>
      <UserLayout>
        <h1 className="flex items-center justify-between text-lg font-medium tracking-tight text-slate-900 sm:text-xl">
          Your events
        </h1>
        <div className="mt-4 space-y-2">
          {events.map(({ id, title, subtitle }) => (
            <div key={id} className="font-medium">
              <Link href={`/admin/list/${id}`}>
                {title} - {subtitle}
              </Link>
            </div>
          ))}
        </div>
      </UserLayout>
    </Layout>
  )
}
export default AdminPage

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const userId = session.user.id

  const events = demoEvents.filter((event) => isEventAdmin(event, userId))

  return {
    props: { events, session }, // will be passed to the page component as props
  }
}
