import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Layout, UserLayout } from "@/src/components"
import { DB } from "@/src/utils/db"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { useQRCode } from "next-qrcode"

import { siteConfig } from "@/src/config/site"
import { authOptions } from "../api/auth/[...nextauth]"

export default function MyTicketsPage({ tickets }) {
  const { data } = useSession()
  const { Canvas } = useQRCode()
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
          <div className="mt-8">
            {tickets.length > 0 ? (
              <div>
                {tickets.map((ticket) => {
                  return (
                    <div key={ticket.id}>
                      {ticket.id} - {ticket.eventId} - {ticket.ticketTypeId}
                      <div>
                        <Canvas
                          text={ticket.id}
                          options={{
                            level: "M",
                            margin: 3,
                            scale: 4,
                            width: 200,
                            color: {
                              dark: "#000000",
                              light: "#ffffff",
                            },
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div>You dont have any tickets</div>
            )}
          </div>
        </div>
      </UserLayout>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const userId = session.user.id
  const { tickets } = await DB.user.findUnique({
    where: { id: userId },
    select: {
      tickets: {
        select: {
          id: true,
          userId: true,
          eventId: true,
          ticketTypeId: true,
          status: true,
          transactionId: true,
        },
      },
    },
  })
  return {
    props: { tickets, session }, // will be passed to the page component as props
  }
}
