/* eslint-disable @next/next/no-img-element */
import React from "react"
import { useRouter } from "next/router"
import { useBuyTicket, useEvents } from "@/src/hooks"
import { dateFromUtc, formatJPY, readableAddress } from "@/src/utils"
import moment from "moment"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { Event } from "@/src/config/events"
import { siteConfig } from "@/src/config/site"
import { Input, RadioGroup, RadioItem } from "../form"
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

type PaymentDetail = {
  ticketType: string
  ticketPrice: number
  numberOfTickets: number
  handlingFee: number
  paymentFee: number
  tax: number
  totalAmount: number
}

export const EventList = (): React.ReactElement => {
  const { status } = useSession()
  const {
    loading,
    error,
    data,
    resetError,
    purchaseTicket,
    ticketPurchaseLoading,
  } = useEvents()
  const {
    register,
    errors,
    watch,
    incrementTicketCount,
    decrementTicketCount,
  } = useBuyTicket()
  const router = useRouter()
  const { t } = useTranslation("common")
  const { lang } = useTranslation()

  if (loading) {
    return <div className="w-full">{t("site-loading")}...</div>
  }

  if (error) {
    return (
      <div>
        <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-600">
          {error}
        </div>
        <Button
          variant="subtle"
          onClick={() => {
            resetError()
          }}
        >
          Okay
        </Button>
      </div>
    )
  }

  const events: Event[] = data?.data

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {events.map((event) => {
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
        const currentPaymentFee =
          currentSubTotal * (siteConfig.fees.paymentFee / 100)
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
              <img
                src={event.photo}
                alt={event.title}
                className="aspect-square"
              />
            </div>
            <div className="relative">
              <div className="z-10 -mt-32 h-32 w-full bg-gradient-to-b from-transparent to-white to-80%">
                &nbsp;
              </div>
              <div className="-mt-16 h-full w-full space-y-6 p-4 text-sm">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                    {event.title}
                  </h2>
                  <h3 className="inline-block font-semibold text-slate-600 uppercase ">
                    {event.subtitle}
                  </h3>
                  <div className="font-sm text-slate-800">
                    {event.description}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-4 text-sm text-slate-800">
                  <div>
                    <div className="font-semibold uppercase">
                      {t("event-date")}
                    </div>
                    <div>
                      {moment(event.dateStart * 1000)
                        .locale("ja")
                        .format("Do MMMM, YYYY")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold uppercase">
                      {t("event-time")}
                    </div>
                    <div>
                      {moment(event.dateStart * 1000)
                        .locale("ja")
                        .format("hh:mmA")}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold uppercase">
                      {t("event-venue")}
                    </div>
                    <div>{event.venue.title}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold uppercase">
                      {t("event-gate-open")}
                    </div>
                    <div>
                      {moment(event.dateGateOpen * 1000)
                        .locale("ja")
                        .format("hh:mmA")}
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className={buttonVariants({ variant: "default" })}>
                      {t("buy-tickets")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    position={"right"}
                    size="content"
                    className="min-w-[28rem] max-h-screen overflow-y-scroll"
                  >
                    <SheetHeader>
                      <SheetTitle>{t("buy-tickets")}</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-5 py-4">
                      <div className="space-y-1">
                        <div className="text-xl font-semibold text-slate-800">
                          {event.title}
                        </div>
                        <div className="font-semibold uppercase text-slate-700">
                          {event.subtitle}
                        </div>
                        <div className="text-sm">
                          {dateFromUtc(
                            event.dateStart * 1000,
                            null,
                            lang === "jp"
                              ? "YYYY年MM月DD日 HH時mm分"
                              : "MMM DD, YYYY h:mm A"
                          )}
                        </div>
                        <div className="text-sm">{event.venue.title}</div>
                        <div className="text-sm">
                          {readableAddress(event.venue.address)}
                        </div>
                      </div>
                      <Separator />
                      <RadioGroup
                        register={register}
                        options={ticketTypesRadioItem}
                        name="ticketType"
                        label={{ label: t("ticket-type"), for: "ticketType" }}
                        supportingText=""
                        error={errors.ticketType?.message as string}
                        disabled={ticketPurchaseLoading}
                      />
                      <Separator />

                      <div className="space-y-4">
                        <div className="text-sm font-medium leading-none">
                          {t("ticket-no-of-tickets")}
                        </div>
                        <div className="grid grid-cols-3 gap-8">
                          <button
                            onClick={() => decrementTicketCount()}
                            className="bg-slate-50 hover:bg-slate-100 py-2 rounded-lg disabled:opacity-20 disabled:hover:bg-slate-50"
                            disabled={watch("numberOfTickets") === "1"}
                          >
                            -1
                          </button>
                          <div className="text-center py-2 text-md font-medium">
                            {watch("numberOfTickets")}
                          </div>
                          <button
                            onClick={() => incrementTicketCount()}
                            className="bg-slate-50 hover:bg-slate-100 py-2 rounded-lg disabled:opacity-20 disabled:hover:bg-slate-50"
                          >
                            +1
                          </button>
                        </div>
                      </div>
                      <Separator />
                      {currentTicketType && currentNoOfTickets && (
                        <div className="max-w-md">
                          <div className="mb-4 bg-slate-200 py-3 px-4 rounded-lg">
                            <h3 className="font-bold">{currentTicketType}</h3>
                            <p className="text-sm mt-1">
                              {currentTicket.description}
                            </p>
                          </div>

                          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 text-sm">
                            <div className="flex flex-row justify-between p-3">
                              <div>{t("ticket-price")}</div>
                              <div>
                                {currentTicketPrice &&
                                  formatJPY(currentTicketPrice)}
                              </div>
                            </div>
                            <div className="flex flex-row justify-between p-3">
                              <div>{t("ticket-no-of-tickets")}</div>
                              <div>{currentNoOfTickets}</div>
                            </div>
                            <div className="flex flex-row justify-between p-3">
                              <div>
                                {t("subtotal")}{" "}
                                <span className="text-slate-500">
                                  ({currentNoOfTickets} ×{" "}
                                  {formatJPY(currentTicketPrice)})
                                </span>
                              </div>
                              <div>
                                {currentSubTotal && formatJPY(currentSubTotal)}
                              </div>
                            </div>
                            <div className="flex flex-row justify-between p-3">
                              <div>{t("handling-fee")}</div>
                              <div>
                                {currentHandlingFee &&
                                  formatJPY(currentHandlingFee)}
                              </div>
                            </div>
                            <div className="flex flex-row justify-between p-3">
                              <div>{t("payment-fee")}</div>
                              <div>
                                {currentPaymentFee &&
                                  formatJPY(currentPaymentFee)}
                              </div>
                            </div>
                            <div className="flex flex-row justify-between p-3">
                              <div>{t("tax")}</div>
                              <div>{currentTax && formatJPY(currentTax)}</div>
                            </div>
                            <div className="flex flex-row justify-between p-3 font-bold">
                              <div>{t("total")}</div>
                              <div>{formatJPY(currentTotal)}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {currentTotal > 0 && (
                      <SheetFooter>
                        {status === "authenticated" ? (
                          <Button
                            type="submit"
                            onClick={async () => {
                              await purchaseTicket({
                                eventId: event.id,
                                ticketId: watch("ticketType"),
                                noOfTickets: parseInt(watch("numberOfTickets")),
                              })
                            }}
                            disabled={ticketPurchaseLoading}
                          >
                            {t("confirm-and-pay")}
                          </Button>
                        ) : (
                          <>
                            <Button
                              type="button"
                              variant="subtle"
                              className="mt-4 md:mt-0"
                              onClick={() => {
                                router.push("/register")
                              }}
                            >
                              {t("auth-register")}
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                router.push("/login")
                              }}
                            >
                              {t("auth-login")}
                            </Button>
                          </>
                        )}
                      </SheetFooter>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
