import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useBuyTicket, useEvents } from "@/src/hooks"
import { dateFromUtc, formatJPY, readableAddress } from "@/src/utils"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { Event } from "@/src/config/events"
import { siteConfig } from "@/src/config/site"
import { RadioGroup, RadioItem } from "../form"
import { Button, buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

export const EventList = ({
  events,
}: {
  events: Event[]
}): React.ReactElement => {
  const { t } = useTranslation("common")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  )
}

export const EventItem = ({ event }: { event: Event }) => {
  const { purchaseTicket, ticketPurchaseLoading } = useEvents()
  const {
    register,
    errors,
    watch,
    incrementTicketCount,
    decrementTicketCount,
  } = useBuyTicket()
  const { status } = useSession()
  const router = useRouter()
  const { t } = useTranslation("common")
  const { lang } = useTranslation()

  const ticketTypesRadioItem: RadioItem[] = event.tickets
    .filter((ticket) => ticket.available)
    .map((ticket) => ({
      label: ticket.title,
      secondaryLabel: ticket.description ?? undefined,
      price: formatJPY(ticket.price),
      value: ticket.id,
    }))

  const currentTicket = event.tickets.find(
    (ticket) => ticket.id === watch("ticketType")
  )
  const currentTicketType = currentTicket?.title || null
  const currentTicketPrice = currentTicket?.price || null
  const currentNoOfTickets = parseInt(watch("numberOfTickets")) || null
  const currentSubTotal = currentTicketPrice * currentNoOfTickets
  const currentHandlingFee = siteConfig.fees.handlingFee || 0
  const currentPaymentFee = currentSubTotal * (siteConfig.fees.paymentFee / 100)
  const currentTax =
    (currentSubTotal + currentHandlingFee + currentPaymentFee) *
    (siteConfig.fees.tax / 100)
  const currentTotal =
    currentSubTotal + currentHandlingFee + currentPaymentFee + currentTax

  return (
    <div
      key={event.id}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white w-full"
    >
      <div>
        <Link href={`/${event.slug}`}>
          <img src={event.photo} alt={event.title} className="aspect-square" />
        </Link>
      </div>
      <div className="relative">
        <div className="z-10 -mt-32 h-32 w-full bg-gradient-to-b from-transparent to-white to-80%">
          &nbsp;
        </div>
        <div className="-mt-16 h-full w-full space-y-6 p-4 text-sm">
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              <Link href={`/${event.slug}`}>{event.title}</Link>
            </h2>
            <h3 className="inline-block font-semibold text-slate-600 uppercase ">
              <Link href={`/${event.slug}`}>{event.subtitle}</Link>
            </h3>
            <div className="font-sm text-slate-800 mt-2">
              {event.description}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-4 text-sm text-slate-800">
            <div>
              <div className="font-semibold uppercase">{t("event-date")}</div>
              <div>
                {dateFromUtc(
                  event.dateStart * 1000,
                  null,
                  lang === "jp" ? "YYYY年MM月DD日" : "Do MMMM, YYYY"
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold uppercase">{t("event-time")}</div>
              <div>
                {dateFromUtc(
                  event.dateStart * 1000,
                  null,
                  lang === "jp" ? "HH時mm分" : "hh:mmA"
                )}
              </div>
            </div>
            <div>
              <div className="font-semibold uppercase">{t("event-venue")}</div>
              <div>{event.venue.title}</div>
            </div>

            <div className="text-right">
              <div className="font-semibold uppercase">
                {t("event-gate-open")}
              </div>
              <div>
                {dateFromUtc(
                  event.dateGateOpen * 1000,
                  null,
                  lang === "jp" ? "HH時mm分" : "hh:mmA"
                )}
              </div>
            </div>
            <div className="col-span-2">
              <div className="font-semibold uppercase">
                {t("event-address")}
              </div>
              <div>{readableAddress(event.venue.address)}</div>
            </div>
            {event.notices.map((notice, index) => {
              return (
                <div
                  key={index}
                  className="col-span-2 rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  {notice}
                </div>
              )
            })}
          </div>
          <div>
            <Link href={`/${event.slug}`}>
              <span className={buttonVariants({ variant: "default" })}>
                {t("buy-tickets")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
