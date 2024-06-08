import crypto from "crypto"
import { bodyFromRaw } from "@/src/utils"

export const validateWebhook = async (headers, req) => {
  try {
    const signature =
      headers["X-Komoju-Signature"] || headers["x-komoju-signature"]
    const endpointSecret = process.env.KOMOJU_WH_KEY

    const rawBody = await bodyFromRaw(req)

    // create hmac sha256 hash from raw body
    const bodySignature = crypto
      .createHmac("sha256", endpointSecret)
      .update(rawBody)
      .digest("hex")

    // compare signature header from webhook and hmac 256 hash from raw body with a timesafe hash compare function
    const signatureComparison = crypto.timingSafeEqual(
      Buffer.from(signature, "utf-8"),
      Buffer.from(bodySignature, "utf-8")
    )

    if (!signatureComparison) return null
    return JSON.parse(rawBody)
  } catch (error) {
    return null
  }
}
