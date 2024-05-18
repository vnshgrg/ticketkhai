import { Readable } from "node:stream"
import { MomentInput } from "moment"
import moment from "moment-timezone"

import { Address } from "../config/events"

export const readableAddress = (address: Address): string => {
  return `〒${address.postalCode} ${address.prefecture}, ${address.city}, ${address.addressLine1}`
}

export const formatJPY = (amount: number): string => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(amount)
}

export const dateFromUtc = (
  date: string | number,
  lang: string,
  format: string
) => {
  const momentDate = moment(date)
  if (!momentDate.isValid) return null

  if (lang === "jp") {
    format = "YYYY年MM月DD日 HH:mm"
  } else if (!format) {
    format = "YYYY/MM/DD HH:mm"
  }
  return momentDate.format(format)
}

export const customBuffer = async (readable: Readable) => {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export const bodyFromRaw = async (req) => {
  const buf = await customBuffer(req)
  const rawBody = buf.toString("utf8")
  return rawBody
}

export const getTimestamp = (date: MomentInput) => {
  return moment.tz(date, "Asia/Tokyo").unix()
}
