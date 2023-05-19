import { Readable } from "node:stream"

import { Address } from "../config/events"

export const readableAddress = (address: Address): string => {
  return `〒${address.postalCode} ${address.prefecture}, ${address.city}, ${address.addressLine1}`
}

export const formatJPY = (amount: number): string => {
  return `￥${numberWithCommas(amount)}`
}

const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
