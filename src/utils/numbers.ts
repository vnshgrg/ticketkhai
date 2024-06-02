import { TransactionRow } from "@/pages/admin/list/[eventId]"
import { Transaction } from "@prisma/client"
import moment from "moment"

const STRIPE_FEE = 0.036
const STRIPE_TAX = 0.1
const TK_FLAT = 100
const TK_PCT = 0.02

type StripeFee = {
  stripeFee: number
  stripeTax: number
}

const stripeFee: StripeFee = {
  stripeFee: STRIPE_FEE,
  stripeTax: STRIPE_TAX,
}

type Fee = {
  ticketKhaiFlat: number
  ticketKhaiPercent: number
}

export const calculateFee = (
  total: number,
  feeOverride?: Fee
): { total: number; net: number; fee: number } => {
  let fee: Fee = {
    ticketKhaiFlat: TK_FLAT,
    ticketKhaiPercent: TK_PCT,
  }
  if (feeOverride) {
    fee = feeOverride
  }

  const stripeFeeAmount = Math.ceil(total * stripeFee.stripeFee)
  const stripeTaxAmount = Math.ceil(stripeFeeAmount * stripeFee.stripeTax)

  const ticketKhaiFeeAmount = Math.ceil(total * fee.ticketKhaiPercent)
  const totalFee =
    stripeFeeAmount + stripeTaxAmount + ticketKhaiFeeAmount + fee.ticketKhaiFlat

  const net = total - totalFee

  return { total, net, fee: totalFee }
}

export type AggregatedStat = {
  frequency: "today" | "yesterday" | "total"
  count: number
  total: number
  quantity: number
  net: number
}

export const aggregateTransactioinStat = (
  txns: TransactionRow[],
  frequency: AggregatedStat["frequency"] = "total"
): AggregatedStat => {
  let transactions: TransactionRow[]
  if (frequency === "today") {
    transactions = txns.filter(({ updatedAt }) => {
      const today = moment()
      const todayStart = today.startOf("day")
      const todayEnd = today.endOf("day")

      const updated = moment(updatedAt)

      return (
        updated.isSameOrAfter(todayStart) && updated.isSameOrBefore(todayEnd)
      )
    })
  } else if (frequency === "yesterday") {
    transactions = txns.filter(({ updatedAt }) => {
      const yesterday = moment().subtract(1, "day")
      const yesterdayStart = yesterday.startOf("day")
      const yesterdayEnd = yesterday.endOf("day")

      const updated = moment(updatedAt)

      return (
        updated.isSameOrAfter(yesterdayStart) &&
        updated.isSameOrBefore(yesterdayEnd)
      )
    })
  } else {
    transactions = txns
  }

  return transactions.reduce(
    (acc, txn) => {
      acc.count = acc.count + 1
      acc.total = acc.total + txn.totalPrice
      acc.quantity = acc.quantity + txn.quantity
      acc.net = acc.net + txn.net
      return acc
    },
    { frequency, count: 0, total: 0, quantity: 0, net: 0 }
  )
}
