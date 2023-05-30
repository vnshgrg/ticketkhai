import Head from "next/head"
import { Layout, Ticket, UserLayout } from "@/src/components"
import { DB } from "@/src/utils/db"
import { eventById, ticketById } from "@/src/utils/temp"
import { KomojuStatus } from "@prisma/client"
import _ from "lodash"
import moment from "moment"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "@/src/config/site"
import { Button } from "@/src/components/ui/button"
import { authOptions } from "../api/auth/[...nextauth]"

export default function MyTicketsPage({ transactions }) {
  const { t } = useTranslation("common")
  return (
    <Layout>
      <Head>
        <title>{siteConfig.name}</title>
      </Head>
      <UserLayout>
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-xl font-medium tracking-tight text-slate-900">
            {t("ticket-your-tickets")}
          </h1>
          <div className="mt-4 mb-6">
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => {
                  return (
                    <Ticket key={transaction.id} transaction={transaction} />
                  )
                })}
              </div>
            ) : (
              <div className="space-y-5">
                <p>{t("no-tickets")}</p>
                <Button variant="subtle">{t("go-home")}</Button>
              </div>
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
  const transactions = await DB.transaction.findMany({
    where: { userId, status: KomojuStatus.captured },
    select: {
      id: true,
      eventId: true,
      ticketTypeId: true,
      unitPrice: true,
      quantity: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      tickets: {
        select: {
          id: true,
          status: true,
          ticketTypeId: true,
          createdAt: true,
          upatedAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const populatedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      event: eventById(transaction.eventId),
      tickets: transaction.tickets.map((ticket) => {
        return {
          ...ticket,
          ..._.omit(ticketById(transaction.eventId, ticket.ticketTypeId), [
            "id",
          ]),
          createdAt: moment(ticket.createdAt).unix(),
          upatedAt: moment(ticket.upatedAt).unix(),
        }
      }),
      createdAt: moment(transaction.createdAt).unix(),
      updatedAt: moment(transaction.updatedAt).unix(),
    }
  })

  return {
    props: { transactions: populatedTransactions, session }, // will be passed to the page component as props
  }
}
