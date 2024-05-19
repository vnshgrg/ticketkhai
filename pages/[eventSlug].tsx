import { useEffect } from "react"
import { useRouter } from "next/router"
import { Layout, RadioGroup, RadioItem, Seo } from "@/src/components"
import { useBuyTicket, useEvents } from "@/src/hooks"
import { dateFromUtc, formatJPY, readableAddress } from "@/src/utils"
import { activeEvents, eventBySlug } from "@/src/utils/temp"
import {
  BanknotesIcon,
  Bars3BottomLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  LockClosedIcon,
  MapIcon,
  MapPinIcon,
  MegaphoneIcon,
  TicketIcon,
} from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { Event } from "@/src/config/events"
import { siteConfig } from "@/src/config/site"
import { Button, buttonVariants } from "@/src/components/ui/button"

export default function EventPage({ event }: { event: Event }) {
  const { purchaseTicket, ticketPurchaseLoading } = useEvents()
  const {
    register,
    errors,
    watch,
    incrementTicketCount,
    decrementTicketCount,
    setValue,
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

  useEffect(() => {
    // select first item as selected ticket
    setValue("ticketType", ticketTypesRadioItem[0].value)
  }, [])

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

  const eventStartDate = event.dateStart * 1000

  const notices = event.notices
  const hasNotice = notices.length > 0

  const selectedTicketRadioItem = currentTicket
    ? ticketTypesRadioItem.find(({ value }) => value === currentTicket.id)
    : null

  const report: { label: string | JSX.Element; value: string | JSX.Element }[] =
    [
      { label: t("ticket-price"), value: formatJPY(currentTicketPrice) },
      { label: t("ticket-no-of-tickets"), value: `${currentNoOfTickets}` },
      {
        label: (
          <>
            {t("subtotal")}{" "}
            <span className="font-normal">
              ({currentNoOfTickets} × {formatJPY(currentTicketPrice)})
            </span>
          </>
        ),
        value: formatJPY(currentSubTotal),
      },
      {
        label: (
          <div className="text-base font-bold text-slate-800 py-2">
            {t("total")}
          </div>
        ),
        value: (
          <div className="text-base font-bold text-slate-800 py-2">
            {formatJPY(currentTotal)}
          </div>
        ),
      },
    ]

  return (
    <Layout>
      <Seo
        title={event.title}
        description={event.description}
        image={event.photo}
      />
      <div className="mx-auto w-full md:min-w-[28rem] max-w-2xl">
        <div className="flex flex-col space-y-4 md:space-y-6 px-5 py-10">
          <div className="flex flex-row items-center space-x-5">
            <div>
              <div className="bg-slate-800 text-white text-center py-2 w-16 rounded-lg">
                <div className={`font-bold ${lang !== "jp" && "text-xl"}`}>
                  {dateFromUtc(
                    eventStartDate,
                    null,
                    lang === "jp" ? "DD日" : "DD"
                  )}
                </div>
                <div
                  className={`text-slate-300 font-bold uppercase ${
                    lang !== "jp" && "text-sm"
                  }`}
                >
                  {dateFromUtc(
                    eventStartDate,
                    null,
                    lang === "jp" ? "MM月" : "MMM"
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-800 dark:text-slate-200 md:text-3xl">
                {event.title}
              </h1>
              <p className="mt-1 text-md font-medium uppercase tracking-tight text-slate-700 dark:text-slate-400 md:text-xl">
                {event.subtitle}
              </p>
            </div>
          </div>
          <div className="aspect-square rounded-lg bg-slate-50 overflow-hidden">
            <img
              src={event.photo}
              alt={event.title}
              className="aspect-square"
            />
          </div>

          <div className={styles.box}>
            <div className={styles.boxContent}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={styles.infoItem}>
                  <div className={styles.labelStyle}>
                    <CalendarDaysIcon className="w-5 h-5 mr-1" />
                    {t("event-date")}
                  </div>
                  <div className={styles.valueStyle}>
                    {dateFromUtc(
                      event.dateStart * 1000,
                      null,
                      lang === "jp" ? "YYYY年MM月DD日" : "Do MMMM, YYYY"
                    )}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.labelStyle}>
                    <ClockIcon className="w-5 h-5 mr-1" />
                    {t("event-time")}
                  </div>
                  <div className={styles.valueStyle}>
                    {dateFromUtc(
                      event.dateStart * 1000,
                      null,
                      lang === "jp" ? "HH時mm分" : "hh:mmA"
                    )}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.labelStyle}>
                    <ClockIcon className="w-5 h-5 mr-1" />
                    {t("event-gate-open")}
                  </div>
                  <div className={styles.valueStyle}>
                    {dateFromUtc(
                      event.dateGateOpen * 1000,
                      null,
                      lang === "jp" ? "HH時mm分" : "hh:mmA"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.boxContent}>
              <div className={styles.labelStyle}>
                <MapPinIcon className="w-5 h-5 mr-1" />
                {t("event-venue")}
              </div>
              <div className={styles.venueContainer}>
                <div>
                  <div className={styles.valueStyle}>
                    <a
                      href={event.venue.address.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={-1}
                    >
                      {event.venue.title}
                    </a>
                  </div>
                  <div className="mt-1">
                    <a
                      href={event.venue.address.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={-1}
                      className="text-sm"
                    >
                      {readableAddress(event.venue.address)}
                    </a>
                  </div>
                </div>
                <div>
                  <a
                    href={event.venue.address.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={2}
                    className={buttonVariants({ variant: "subtle" })}
                  >
                    <MapIcon className="w-5 h-5 mr-2" /> {t("show-on-map")}
                  </a>
                </div>
              </div>
            </div>
            {event.description && (
              <div className={styles.boxContent}>
                <div className={styles.labelStyle}>
                  <Bars3BottomLeftIcon className="w-5 h-5 mr-1" />
                  {t("about-event")}
                </div>
                <div className="text-base mt-2">{event.description}</div>
              </div>
            )}
          </div>

          {hasNotice && (
            <div className={styles.noticeContainer}>
              {notices.map((notice, index) => (
                <div key={index} className={styles.noticeItem}>
                  <MegaphoneIcon className="w-5 h-5 mr-3 shrink-0" /> {notice}
                </div>
              ))}
            </div>
          )}

          <div className={styles.box}>
            <div className={styles.boxContent}>
              <RadioGroup
                register={register}
                options={ticketTypesRadioItem}
                name="ticketType"
                label={{ label: t("ticket-type"), for: "ticketType" }}
                supportingText=""
                error={errors.ticketType?.message as string}
                disabled={ticketPurchaseLoading}
                value={selectedTicketRadioItem}
              />
            </div>
            <div className={styles.boxContent}>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between items-baseline">
                <div className={`${styles.labelStyle}`}>
                  {t("ticket-no-of-tickets")}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    onClick={() => decrementTicketCount()}
                    className={buttonVariants({ variant: "subtle" })}
                    disabled={watch("numberOfTickets") === "1"}
                  >
                    -1
                  </Button>
                  <div className="text-center text-md font-medium border border-slate-200 w-12 py-2 rounded-lg">
                    {watch("numberOfTickets")}
                  </div>
                  <Button
                    onClick={() => incrementTicketCount()}
                    className={buttonVariants({ variant: "subtle" })}
                  >
                    +1
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {status === "authenticated" && (
            <>
              {currentTicketType && currentNoOfTickets && (
                <div className={styles.box}>
                  <div className={styles.boxContent}>
                    <div className="space-y-4">
                      <div className="flex flex-row items-start bg-slate-200 py-3 px-4 rounded-lg">
                        <TicketIcon className="h-10 w-10 text-slate-500 mr-4" />
                        <div>
                          <h3 className="text-lg font-bold">
                            {currentTicketType}
                          </h3>
                          <p className="">{currentTicket.description}</p>
                        </div>
                      </div>

                      <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                        {report.map(({ label, value }, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-row justify-between p-3"
                            >
                              <div className="text-slate-500 uppercase font-medium text-sm">
                                {label}
                              </div>
                              <div className="text-slate-600">{value}</div>
                            </div>
                          )
                        })}
                      </div>
                      <Button
                        type="submit"
                        onClick={async () => {
                          await purchaseTicket({
                            eventId: event.id,
                            ticketId: watch("ticketType"),
                            noOfTickets: parseInt(watch("numberOfTickets")),
                          })
                        }}
                        className="w-full flex flex-row items-center"
                        size="lg"
                        disabled={ticketPurchaseLoading}
                      >
                        <BanknotesIcon className="mr-2 w-5 h-5" />
                        {t("confirm-and-pay")}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {status !== "authenticated" && (
            <div className={styles.box}>
              <div className={styles.boxContent}>
                <div className="flex flex-col items-center py-4 text-center">
                  <LockClosedIcon className="text-slate-400 w-10 h-10" />
                  <h3 className="text-slate-700 font-semibold text-lg">
                    {t("login-or-register")}
                  </h3>
                  <p className="text-slate-700">
                    {t("login-or-register-description")}
                  </p>
                  <div className="pt-6 flex gap-x-4 items-center justify-center">
                    <Button
                      onClick={() => {
                        router.push("/login")
                      }}
                      className={buttonVariants({
                        variant: "subtle",
                        size: "lg",
                      })}
                    >
                      {t("auth-login")}
                    </Button>
                    <Button
                      onClick={() => {
                        router.push("/register")
                      }}
                      className={buttonVariants({
                        variant: "subtle",
                        size: "lg",
                      })}
                    >
                      {t("auth-register")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async (context) => {
  const event = eventBySlug(context.params?.eventSlug as string)
  return { props: { event } }
}

export const getStaticPaths = async ({ locales }) => {
  const events = activeEvents()
  const paths = []

  events.map(({ slug }) => {
    locales.map((locale) => {
      paths.push({ params: { eventSlug: slug }, locale })
    })
  })

  return {
    paths,
    fallback: false,
  }
}

const styles = {
  labelStyle:
    "flex items-center text-sm font-semibold text-slate-500 uppercase mb-2",
  valueStyle: "text-base font-semibold",
  infoItem: "",
  venueContainer:
    "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0",
  box: "space-y-2 divide-y-2 divide-slate-100 rounded-lg bg-white shadow-md shadow-slate-100",
  boxContent: "p-4",
  noticeContainer:
    "divide-y divide-red-600 rounded-lg text-red-50 bg-red-700 text-sm shadow-md shadow-red-300",
  noticeItem: "flex items-center text-base text-red-100 px-4 py-3",
}
