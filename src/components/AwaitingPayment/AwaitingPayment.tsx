import { useState } from "react"
import Link from "next/link"
import { dateFromUtc, formatJPY } from "@/src/utils"
import moment from "moment"
import useTranslation from "next-translate/useTranslation"

import { TransactionStatus } from "@/src/config/transactionStatusLabel"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"

export const AwaitingPayment = ({ transaction }) => {
  const [isShown, setIsShown] = useState(false)
  const { t } = useTranslation("common")

  const isBankTransfer =
    transaction.paymentDetails?.display_bank_transfer_instructions
  const isKonbiniTransfer = transaction.paymentDetails?.konbini_display_details

  return (
    <div className="space-y-2 divide-y-2 divide-slate-100 rounded-xl bg-white py-3 px-4 text-sm shadow-md shadow-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col-reverse sm:flex-row">
          <h2 className="mt-2 text-base sm:mt-0">
            <span className="font-semibold">{transaction.event.title}</span>
            <span className="hidden sm:inline">
              {" "}
              - {transaction.event.subtitle}
            </span>
          </h2>
          <div className="sm:ml-4">
            <div
              className={cn([
                "inline-block rounded py-1 px-2 text-xs",
                TransactionStatus[transaction.status].classNames,
              ])}
            >
              {t(`ts-${transaction.status}`)}
            </div>
          </div>
        </div>
        <div className="mt-1 sm:mt-0 sm:text-right">
          <div className="hidden sm:block">{t("ticket-transaction-id")}</div>
          <div className="font-mono text-xs text-slate-400">
            {transaction.id.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-4 pt-4 pb-2 sm:grid-cols-4 sm:gap-y-0">
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
            {transaction.quantity}
            {t("ticket-sheets")}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="text-xs uppercase text-slate-500">
            {t("ordered-at")}
          </div>
          <div className="">
            {dateFromUtc(transaction.updatedAt * 1000, "Do MMMM, YYYY h:mmA")}
          </div>
        </div>
        <div className="col-span-2 hidden flex-col space-y-2 text-center sm:col-span-1 sm:flex sm:text-right">
          <div>
            {transaction.paymentDetails && (
              <Button
                variant="subtle"
                onClick={() => {
                  setIsShown((isShown) => !isShown)
                }}
              >
                <span>{isShown ? t("pd-hide") : t("pd-show")}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {transaction.paymentDetails && (
        <div className="col-span-2 space-y-2 pt-3 pb-1 text-center sm:col-span-1 sm:hidden sm:text-right">
          <Button
            variant="subtle"
            width="full"
            onClick={() => {
              setIsShown((isShown) => !isShown)
            }}
          >
            <span>{isShown ? t("pd-hide") : t("pd-show")}</span>
          </Button>
        </div>
      )}

      {isShown && isBankTransfer && (
        <BankTransferInstruction transaction={transaction} />
      )}

      {isShown && isKonbiniTransfer && (
        <KonbiniTransferInstruction transaction={transaction} />
      )}
    </div>
  )
}

function BankTransferInstruction({ transaction }) {
  const { t } = useTranslation("common")
  const bankTransferInstruction =
    transaction.paymentDetails.display_bank_transfer_instructions

  if (!bankTransferInstruction) return null

  return (
    <div className="divide-y-2 divide-slate-100">
      <div className={`sm:-pb-4 flex space-x-6 py-4`}>
        <div className="grid grow grid-cols-2 items-center gap-x-0 gap-y-4 sm:grid-cols-4 sm:gap-4">
          <div className="col-span-1 opacity-50">
            <div className="text-xs uppercase text-slate-500">{t("total")}</div>
            <div className="">{formatJPY(transaction.totalPrice)}</div>
          </div>
          <div className="col-span-1 opacity-50">
            <div className="text-xs uppercase text-slate-500">
              {t("pd-amount-received")}
            </div>
            <div className="">
              {formatJPY(
                transaction.totalPrice -
                  bankTransferInstruction.amount_remaining
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-xs uppercase text-slate-500">
              {t("pd-transfer-amount")}
            </div>
            <div className="font-bold">
              {formatJPY(bankTransferInstruction.amount_remaining)}
            </div>
          </div>
          <div className="col-span-1 text-right">
            <div className="">
              <Link
                href={bankTransferInstruction.hosted_instructions_url}
                target="_blank"
              >
                {t("pd-show-full-transfer-details")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`sm:-pb-4 flex space-x-6 py-4`}>
        <div className="grid grow grid-cols-2 gap-x-0 gap-y-4 sm:grid-cols-4 sm:gap-4">
          {Object.entries(
            bankTransferInstruction.financial_addresses[0].zengin
          ).map(([key, value], index) => (
            <div
              key={index}
              className={key === "account_holder_name" ? `col-span-2` : ""}
            >
              <div className="text-xs uppercase text-slate-500">
                {/* {t("event-title")} */}
                {t(`pd-${key}`)}
              </div>
              <div className="">{value as string}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex items-center justify-center py-4 text-slate-600 sm:pb-2`}
      >
        <div className="">
          {t("pd-message", {
            amount: formatJPY(bankTransferInstruction.amount_remaining),
          })}
        </div>
      </div>
    </div>
  )
}

function KonbiniTransferInstruction({ transaction }) {
  const { t } = useTranslation("common")

  const konbiniTransferInstruction =
    transaction.paymentDetails.konbini_display_details

  if (!konbiniTransferInstruction) return null

  return (
    <div className="divide-y-2 divide-slate-100">
      <div className={`sm:-pb-4 flex space-x-6 py-4`}>
        <div className="grid grow grid-cols-1 items-center gap-x-0 gap-y-4 sm:grid-cols-4 sm:gap-4">
          <div className="col-span-1 opacity-80">
            <div className="text-xs uppercase text-slate-500">{t("total")}</div>
            <div className="">{formatJPY(transaction.totalPrice)}</div>
          </div>
          <div className="col-span-1 lg:col-span-2 opacity-80">
            <div className="text-xs uppercase text-slate-500">Expires</div>
            <div className="">
              {dateFromUtc(
                konbiniTransferInstruction.expires_at * 1000,
                "Do MMMM, YYYY h:mmA"
              )}
            </div>
          </div>
          <div className="col-span-1 text-center lg:text-right">
            <div className="">
              <Link
                href={konbiniTransferInstruction.hosted_voucher_url}
                target="_blank"
              >
                {t("pd-show-full-transfer-details")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`sm:-pb-4 flex space-x-6 py-4`}>
        <div className="grid grow grid-cols-1 gap-x-0 gap-y-4 sm:grid-cols-4 sm:gap-4">
          {Object.entries(konbiniTransferInstruction.stores).map(
            ([key, value]: [string, any], index) => (
              <KonbiniDetail key={index} konbini={key} details={value} />
            )
          )}
        </div>
      </div>
    </div>
  )
}

type KonbiniDetailsProps = {
  konbini: string
  details: {
    confirmation_number: string
    payment_code: string
  }
}
function KonbiniDetail({ konbini, details }: KonbiniDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div className="text-xs uppercase text-slate-500">
        {/* {t(`pd-${key}`)} */}
        {konbini}
      </div>
      {isOpen && (
        <div>
          <div className="mt-3 text-xs font-medium text-slate-500">
            Confirmation number
          </div>
          <div className="font-mono text-normal">
            {details.confirmation_number}
          </div>
          <div className="mt-3 text-xs font-medium text-slate-500">
            Payment code
          </div>
          <div className="font-mono text-normal">{details.payment_code}</div>
        </div>
      )}
      <div
        onClick={() => {
          setIsOpen((curr) => !curr)
        }}
        className="mt-2 cursor-pointer text-slate-700 hover:text-slate-900"
      >
        {isOpen ? "Hide instruction" : "Show instruction"}
      </div>
    </div>
  )
}
