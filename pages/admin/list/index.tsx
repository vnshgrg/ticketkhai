import Link from "next/link"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Layout, Seo, UserLayout } from "@/src/components"
import { getServerSession } from "next-auth/next"

import { isEventAdmin } from "@/src/config/admins"
import { events } from "@/src/config/events"

const AdminPage = ({ events }) => {
  return (
    <Layout>
      <Seo title="Your events" />
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

  const availableEvents = events.filter((event) => isEventAdmin(event, userId))

  return {
    props: { events: availableEvents, session }, // will be passed to the page component as props
  }
}
