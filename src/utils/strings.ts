import { Readable } from "node:stream"
import moment from "moment"

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
  format: any = "YYYY/MM/DD HH:mm:ss"
) => {
  const momentDate = moment(date)
  if (!momentDate.isValid) return null

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
