import React, { useState } from "react"
import { useRouter } from "next/router"
import { useBuyTicket, useEvents } from "@/src/hooks"
import { formatJPY, readableAddress } from "@/src/utils"
import moment from "moment"
import { useSession } from "next-auth/react"

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
  const { loading, error, data, purchaseTicket, ticketPurchaseLoading } =
    useEvents()
  const { register, errors, watch } = useBuyTicket()
  const router = useRouter()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const events: Event[] = data?.data

  return (
    <div className="">
      {events.map((event) => {
        const ticketTypesRadioItem: RadioItem[] = event.tickets.map(
          (ticket) => ({
            label: ticket.title,
            value: ticket.id,
          })
        )

        const currentTicketType =
          event.tickets.find((ticket) => ticket.id === watch("ticketType"))
            ?.title || null
        const currentTicketPrice =
          event.tickets.find((ticket) => ticket.id === watch("ticketType"))
            ?.price || null
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
            className="space-y-4 rounded-lg border border-slate-200 bg-white py-3 px-4"
          >
            <div className="text-2xl font-semibold text-slate-800">
              {event.title}
            </div>
            <div className=" font-medium uppercase text-slate-600">
              {event.subtitle}
            </div>
            <div className="font-sm text-slate-800">{event.description}</div>
            <div className="space-y-1 text-slate-800">
              <div>
                <span className="font-medium">Date:</span>{" "}
                {moment(event.dateStart * 1000).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Time:</span>{" "}
                {moment(event.dateStart * 1000).format("HH:mma")}
              </div>
              <div>
                <span className="font-medium">Venue:</span> {event.venue.title}
              </div>
              <div>
                <span className="font-medium">Address:</span>{" "}
                {readableAddress(event.venue.address)}
              </div>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className={buttonVariants({ variant: "subtle" })}>
                  {event.tickets[0].title} now available at{" "}
                  {formatJPY(event.tickets[0].price)}
                </Button>
              </SheetTrigger>
              <SheetContent
                position={"right"}
                size="content"
                className="max-h-screen overflow-y-scroll "
              >
                <SheetHeader>
                  <SheetTitle>Buy your tickets</SheetTitle>
                </SheetHeader>
                <div className="grid gap-5 py-4">
                  <div className="space-y-2">
                    <div className="text-xl font-semibold text-slate-800">
                      {event.title}
                    </div>
                    <div>{moment(event.dateStart * 1000).toLocaleString()}</div>
                    <div>{readableAddress(event.venue.address)}</div>
                  </div>
                  <Separator />
                  <RadioGroup
                    register={register}
                    options={ticketTypesRadioItem}
                    name="ticketType"
                    label={{ label: "Ticket type", for: "ticketType" }}
                    supportingText=""
                    error={errors.ticketType?.message as string}
                    disabled={ticketPurchaseLoading}
                  />
                  <Separator />
                  <Input
                    type="number"
                    name="numberOfTickets"
                    id="numberOfTickets"
                    placeholder="1"
                    label={{ label: "No. of tickets", for: "numberOfTickets" }}
                    error={errors.numberOfTickets?.message as string}
                    aria-invalid={errors.numberOfTickets ? true : false}
                    disabled={ticketPurchaseLoading}
                    {...register("numberOfTickets")}
                  />
                  <Separator />
                  {currentTicketType && currentNoOfTickets && (
                    <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 text-sm">
                      <div className="flex flex-row justify-between p-3">
                        <div>Ticket Type</div>
                        <div>{currentTicketType}</div>
                      </div>
                      <div className="flex flex-row justify-between p-3">
                        <div>Ticket Price</div>
                        <div>
                          {currentTicketPrice && formatJPY(currentTicketPrice)}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between p-3">
                        <div>No. of tickets</div>
                        <div>{currentNoOfTickets}</div>
                      </div>
                      <div className="flex flex-row justify-between p-3">
                        <div>
                          Sub Total{" "}
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
                        <div>Handling fee</div>
                        <div>
                          {currentHandlingFee && formatJPY(currentHandlingFee)}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between p-3">
                        <div>Payment fee</div>
                        <div>
                          {currentPaymentFee && formatJPY(currentPaymentFee)}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between p-3">
                        <div>Tax</div>
                        <div>{currentTax && formatJPY(currentTax)}</div>
                      </div>
                      <div className="flex flex-row justify-between p-3 font-bold">
                        <div>Total</div>
                        <div>{formatJPY(currentTotal)}</div>
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
                        Confirm & pay
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
                          Register
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            router.push("/login")
                          }}
                        >
                          Sign in
                        </Button>
                      </>
                    )}
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        )
      })}
    </div>
  )
}
