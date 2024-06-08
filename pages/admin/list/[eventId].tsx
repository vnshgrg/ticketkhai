import React from "react"
import Head from "next/head"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Layout, Seo, UserLayout } from "@/src/components"
import { classNames, dateFromUtc, formatJPY } from "@/src/utils"
import { DB } from "@/src/utils/db"
import {
  AggregatedStat,
  aggregateTransactioinStat,
  calculateFee,
} from "@/src/utils/numbers"
import { eventById, ticketById } from "@/src/utils/temp"
import { KomojuStatus, Transaction } from "@prisma/client"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { getServerSession } from "next-auth/next"

import { isEventAdmin } from "@/src/config/admins"
import { Event, Ticket } from "@/src/config/events"
import { siteConfig } from "@/src/config/site"

export type TransactionRow = Pick<
  Transaction,
  | "id"
  | "eventId"
  | "unitPrice"
  | "quantity"
  | "totalPrice"
  | "status"
  | "createdAt"
  | "updatedAt"
> & { ticket: Ticket; fee: number; net: number }

const defaultAggregatedCount: AggregatedStat = {
  frequency: "total",
  count: 0,
  total: 0,
  quantity: 0,
  net: 0,
}

const AdminPage = ({
  event,
  transactions: txns,
}: {
  event: Event
  transactions: string
}) => {
  const [data, _setData] = React.useState(() => [])
  const [today, setToday] = React.useState<AggregatedStat>({
    ...defaultAggregatedCount,
    frequency: "today",
  })
  const [yesterday, setYesterday] = React.useState<AggregatedStat>({
    ...defaultAggregatedCount,
    frequency: "yesterday",
  })
  const [total, setTotal] = React.useState<AggregatedStat>({
    ...defaultAggregatedCount,
    frequency: "total",
  })

  React.useEffect(() => {
    const transactions: TransactionRow[] = JSON.parse(txns).map(
      ({ eventId, ticketTypeId, ...rest }) => {
        const { net, fee } = calculateFee(rest.totalPrice)
        return {
          ...rest,
          ticket: ticketById(eventId, ticketTypeId),
          fee,
          net,
        }
      }
    )
    _setData(transactions)

    setToday(aggregateTransactioinStat(transactions, "today"))
    setYesterday(aggregateTransactioinStat(transactions, "yesterday"))
    setTotal(aggregateTransactioinStat(transactions, "total"))
  }, [txns])

  const columnHelper = createColumnHelper<TransactionRow>()

  const columns = [
    columnHelper.accessor((row) => row.ticket.title, {
      id: "Ticket",
      cell: (info) => info.getValue(),
      header: () => "Ticket",
    }),
    columnHelper.accessor("unitPrice", {
      header: () => <Right>Price</Right>,
      cell: (info) => <Right>{formatJPY(info.getValue())}</Right>,
    }),
    columnHelper.accessor("quantity", {
      header: () => <Right>Quantity</Right>,
      cell: (info) => <Right>{info.getValue()}</Right>,
    }),
    columnHelper.accessor("totalPrice", {
      header: () => <Right>Total</Right>,
      cell: (info) => <Right>{formatJPY(info.getValue())}</Right>,
    }),
    columnHelper.accessor("fee", {
      header: () => <Right>Fee</Right>,
      cell: (info) => <Right>{formatJPY(info.getValue())}</Right>,
    }),
    columnHelper.accessor("net", {
      header: () => <Right>Net</Right>,
      cell: (info) => (
        <Right className="font-semibold">{formatJPY(info.getValue())}</Right>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: () => <Right>Ordered at</Right>,
      cell: (info) => (
        <Right>
          {dateFromUtc(
            new Date(info.getValue()).toUTCString(),
            "",
            "YYYY-MM-DD HH:mm"
          )}
        </Right>
      ),
    }),
    columnHelper.accessor("updatedAt", {
      header: () => <Right>Fulfilled at</Right>,
      cell: (info) => (
        <Right>
          {dateFromUtc(
            new Date(info.getValue()).toUTCString(),
            "",
            "YYYY-MM-DD HH:mm"
          )}
        </Right>
      ),
    }),
    columnHelper.accessor("id", {
      header: () => "Transaction ID",
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Layout>
      <Seo title={event.title} />
      <UserLayout>
        <h1 className="flex items-center justify-between text-lg font-medium tracking-tight text-slate-900 sm:text-xl">
          {event.title} - {event.subtitle}
        </h1>
        <div className="mt-4 space-y-2">
          <StatsRow title="Today" stats={today} />
          <StatsRow title="Yesterday" stats={yesterday} />
          <StatsRow title="Total" stats={total} />

          <div className="overflow-scroll shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-slate-800"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="whitespace-nowrap text-sm text-slate-600 hover:bg-slate-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
        </div>
      </UserLayout>
    </Layout>
  )
}
export default AdminPage

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const userId = session.user.id

  const { eventId } = context.query

  const event = eventById(eventId)

  if (!event)
    return {
      // throw 404 error
    }

  if (isEventAdmin(event, userId)) {
    const transactions = await DB.transaction.findMany({
      where: {
        AND: [{ eventId: event.id }, { status: KomojuStatus.captured }],
      },
      select: {
        id: true,
        eventId: true,
        ticketTypeId: true,
        unitPrice: true,
        quantity: true,
        totalPrice: true,
        status: true,
        stripeSessionId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return {
      props: { event, session, transactions: JSON.stringify(transactions) },
    }
  }
  return { props: { event, session, transactions: JSON.stringify([]) } }
}

const Right = ({
  children,
  className,
}: {
  children: React.ReactElement | string | number
  className?: string
}) => {
  return <div className={`text-right ${className}`}>{children}</div>
}

const StatsRow = ({
  title,
  stats,
}: {
  title: string
  stats: AggregatedStat
}) => (
  <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-4">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt className="text-sm font-medium leading-6 text-gray-500">
        Total sales
      </dt>
      <dd
        className={classNames(
          // stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
          "text-xs font-medium"
        )}
      >
        {title}
      </dd>
      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
        {formatJPY(stats.total)}
      </dd>
    </div>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt className="text-sm font-medium leading-6 text-gray-500">Net sales</dt>
      <dd
        className={classNames(
          // stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
          "text-xs font-medium"
        )}
      >
        {title}
      </dd>
      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
        {formatJPY(stats.net)}
      </dd>
    </div>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt className="text-sm font-medium leading-6 text-gray-500">
        Transactions
      </dt>
      <dd
        className={classNames(
          // stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
          "text-xs font-medium"
        )}
      >
        {title}
      </dd>
      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
        {stats.count}
      </dd>
    </div>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt className="text-sm font-medium leading-6 text-gray-500">
        Total tickets
      </dt>
      <dd
        className={classNames(
          // stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
          "text-xs font-medium"
        )}
      >
        {title}
      </dd>
      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
        {stats.quantity}
      </dd>
    </div>
  </dl>
)
