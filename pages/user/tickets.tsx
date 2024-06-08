import Head from "next/head"
import {
  AwaitingPayment,
  Layout,
  Seo,
  Ticket,
  UserLayout,
} from "@/src/components"
import { listAvailableTickets, listPendingTransactions } from "@/src/utils/user"
import _ from "lodash"
import { getServerSession } from "next-auth/next"
import useTranslation from "next-translate/useTranslation"

import { siteConfig } from "@/src/config/site"
import { Button } from "@/src/components/ui/button"
import { authOptions } from "../api/auth/[...nextauth]"

export default function MyTicketsPage({ tickets, pending }) {
  const { t } = useTranslation("common")
  return (
    <Layout>
      <Seo title={t("ticket-your-tickets")} />
      <UserLayout>
        <div className="relative mx-auto max-w-4xl">
          <h1 className="flex items-center justify-between text-lg font-medium tracking-tight text-slate-900 sm:text-xl">
            {t("ticket-your-tickets")}
            <Button variant="subtle">{t("go-home")}</Button>
          </h1>
          <div className="mb-6 mt-4">
            {tickets.length > 0 ? (
              <div className="space-y-4">
                {tickets.map((transaction) => {
                  return (
                    <Ticket key={transaction.id} transaction={transaction} />
                  )
                })}
              </div>
            ) : (
              <p>{t("no-tickets")}</p>
            )}
          </div>

          {pending.filter((transaction) => transaction.status === "authorized")
            .length > 0 && (
            <div className="pt-4">
              <h1 className="flex items-center justify-between text-lg font-medium tracking-tight text-slate-900 sm:text-xl">
                {t("awaiting-payment")}
              </h1>
              <div className="mb-6 mt-4">
                <div className="space-y-4">
                  {pending.map((transaction) => {
                    return (
                      <AwaitingPayment
                        key={transaction.id}
                        transaction={transaction}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </UserLayout>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const userId = session.user.id

  const tickets = await listAvailableTickets(userId)
  const pending = await listPendingTransactions(userId)

  return {
    props: { tickets, pending, session }, // will be passed to the page component as props
  }
}
