import crypto from "crypto"

export const newUUID = () => {
  return crypto.randomUUID()
}
