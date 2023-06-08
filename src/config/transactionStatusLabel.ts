import { KomojuStatus } from "@prisma/client"

export const TransactionStatus = {
  authorized: {
    code: KomojuStatus.authorized,
    classNames: "text-yellow-800 bg-yellow-200",
  },
  captured: {
    code: KomojuStatus.captured,
    classNames: "text-white bg-green-600",
  },
  expired: {
    code: KomojuStatus.expired,
    classNames: "text-white bg-red-600",
  },
  failed: {
    code: KomojuStatus.failed,
    classNames: "text-white bg-red-600",
  },
  cancelled: {
    code: KomojuStatus.cancelled,
    classNames: "text-white bg-red-600",
  },
  created: {
    code: KomojuStatus.created,
    classNames: "text-yellow-800 bg-yellow-200",
  },
}
