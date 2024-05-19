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
  const { t } = useTranslation("common")
  const { lang } = useTranslation()

  const eventStartDate = event.dateStart * 1000;

  return (
    <div>
      <div
        className="overflow-hidden rounded-lg border border-slate-200 bg-white w-full"
      >
        <div>
          <Link href={`/${event.slug}`}>
            <img src={event.photo} alt={event.title} className="aspect-square" />
          </Link>
        </div>
        <div className="relative">
          <div className="h-full w-full space-y-4 p-4 text-sm">
            <div>
              <div className="flex space-x-3">
                <div className="bg-slate-800 text-white text-center py-1 w-12 rounded-lg">
                  <div className={`font-bold ${lang !== "jp" && "text-base"}`}>
                    {dateFromUtc(
                      eventStartDate,
                      null,
                      lang === "jp" ? "DD日" : "DD"
                    )}
                  </div>
                  <div
                    className={`text-slate-400 font-bold uppercase text-sm ${
                      lang !== "jp" && ""
                    }`}
                  >
                    {dateFromUtc(
                      eventStartDate,
                      null,
                      lang === "jp" ? "MM月" : "MMM"
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                    <Link href={`/${event.slug}`}>{event.title}</Link>
                  </h2>
                  <h3 className="inline-block font-medium text-slate-600 uppercase">
                    <Link href={`/${event.slug}`}>{event.subtitle}</Link>
                  </h3>
                </div>
              </div>  
              <div className="font-sm text-slate-800 mt-4">
                {event.description}
              </div>
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
            <div>
              <Link href={`/${event.slug}`}>
                <span className={`${buttonVariants({ variant: "default" })} w-full`}>
                  {t("buy-tickets")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
