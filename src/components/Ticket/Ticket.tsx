import { useState } from "react"
import { dateFromUtc, formatJPY } from "@/src/utils"
import { TicketStatus } from "@prisma/client"
import moment from "moment"
import { useQRCode } from "next-qrcode"
import useTranslation from "next-translate/useTranslation"

import { Button } from "@/src/components/ui/button"

export const Ticket = ({ transaction }) => {
  const [isShown, setIsShown] = useState(false)
  const { Canvas } = useQRCode()
  const { t } = useTranslation("common")
  const { lang } = useTranslation()

  const ticketStatusClass = (status: TicketStatus): string => {
    if (status === TicketStatus.available) {
      return "bg-green-100 text-green-600"
    } else if (status === TicketStatus.used) {
      return "bg-slate-100 text-slate-600"
    } else if (status === TicketStatus.restricted) {
      return "bg-red-100 text-red-600"
    }
  }

  return (
    <div className="space-y-2 divide-y-2 divide-slate-100 rounded-xl bg-white px-4 py-3 text-sm shadow-md shadow-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base">
            <span className="font-semibold">{transaction.event.title}</span>
            <span className="hidden sm:inline">
              {" "}
              - {transaction.event.subtitle}
            </span>
          </h2>
        </div>
        <div className="mt-1 sm:mt-0 sm:text-right">
          <div className="hidden sm:block">{t("ticket-transaction-id")}</div>
          <div className="font-mono text-xs text-slate-400">
            {transaction.id.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-4 pb-2 pt-4 sm:grid-cols-4 sm:gap-y-0">
        <div>
          <div className="text-xs uppercase text-slate-500">
            {t("ticket-price")}
          </div>
          <div className="font-bold text-slate-800">
            {formatJPY(transaction.totalPrice)}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-500">
            {t("ticket-no-of-tickets")}
          </div>
          <div className="">
            {transaction.tickets.length}
            {t("ticket-sheets")}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="text-xs uppercase text-slate-500">
            {t("ticket-purchased-on")}
          </div>
          <div className="">
            {dateFromUtc(
              transaction.updatedAt * 1000,
              lang,
              "Do MMMM, YYYY h:mmA"
            )}
          </div>
        </div>
        <div className="col-span-2 hidden text-center sm:col-span-1 sm:block sm:text-right">
          <Button
            variant="subtle"
            onClick={() => {
              setIsShown((isShown) => !isShown)
            }}
          >
            <span>{isShown ? t("ticket-hide") : t("ticket-show")}</span>
          </Button>
        </div>
      </div>
      {isShown && (
        <div className="divide-y-2 divide-slate-100">
          {transaction.tickets.map((ticket, index) => {
            return (
              <div key={ticket.id} className={`sm:-pb-4 flex space-x-6 py-4`}>
                <div className="grid grow grid-cols-2 gap-x-0 gap-y-4 sm:grid-cols-4 sm:gap-4">
                  <div className="col-span-2 sm:col-span-1 sm:row-span-4">
                    <div className="flex flex-col items-center">
                      <Canvas
                        text={ticket.id}
                        options={{
                          level: "M",
                          margin: 0,
                          scale: 4,
                          width: 120,
                          color: {
                            dark: "#000000",
                            light: "#ffffff",
                          },
                        }}
                      />
                      <div className="mt-2 font-mono text-xs text-slate-400">
                        {ticket.id.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-slate-500">
                      {t("event-title")}
                    </div>
                    <div className="">{transaction.event.title}</div>
                  </div>
                  <div className="text-right sm:col-span-2 sm:text-left">
                    <div className=" text-xs uppercase text-slate-500">
                      {t("event-show")}
                    </div>
                    <div className="">{transaction.event.subtitle}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-slate-500">
                      {t("event-date")}
                    </div>
                    <div className="">
                      {dateFromUtc(
                        transaction.event.dateStart * 1000,
                        null,
                        lang === "jp" ? "YYYY年MM月DD日" : "MMM DD, YYYY"
                      )}
                    </div>
                  </div>
                  <div className="text-right sm:col-span-2 sm:text-left">
                    <div className=" text-xs uppercase text-slate-500">
                      {t("event-time")}
                    </div>
                    <div className="">
                      {dateFromUtc(
                        transaction.event.dateStart * 1000,
                        null,
                        lang === "jp" ? "HH:mm" : "h:mmA"
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-slate-500">
                      {t("ticket-type")}
                    </div>
                    <div className="">{ticket.title}</div>
                  </div>
                  <div className="text-right sm:col-span-2 sm:text-left">
                    <div className=" text-xs uppercase text-slate-500">
                      {t("ticket-status")}
                    </div>
                    <div
                      className={`inline-block rounded-full px-2 py-0.5 text-xs uppercase ${ticketStatusClass(
                        ticket.status
                      )}`}
                    >
                      {t(`ticket-status-${ticket.status}`)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <div className="col-span-2 pt-3 text-center sm:col-span-1 sm:hidden sm:text-right">
        <Button
          variant="subtle"
          width="full"
          onClick={() => {
            setIsShown((isShown) => !isShown)
          }}
        >
          <span>{isShown ? t("ticket-hide") : t("ticket-show")}</span>
        </Button>
      </div>
    </div>
  )
}
