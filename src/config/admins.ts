import { isProduction } from "../utils"
import { Event } from "./events"

const productionAdmins = {
  avinash: "cli5ywph50000le0frjjmaaeh",
  dipesh: "cli6vp3gc0000l00gxbeoue0b",
  suvash: "clikcmdzp0000mm0ft2016867",
  asim: "clwy879kz0000lc0c2ty7fq0y",
}

const devAdmins = {
  avinash: "clfy7d1o400027ap7l0qyepin",
  dipesh: "clhvg96he0000l30f56u8stu1",
  suvash: "cluz7wr8r0000gy0fmbvlsstg",
  asim: "cluz7wr8r0000gy0fmbvlsstg", // could not find dev user ID
}

export const admins = isProduction ? productionAdmins : devAdmins

const isGodAdmin = (userId: string) =>
  userId === admins.avinash || userId === admins.dipesh

export const isAdmin = (userId: string) => {
  if (isGodAdmin(userId)) return true
  return !!Object.values(admins).find((id) => id === userId)
}

export const isEventAdmin = (event: Event, userId: string) => {
  if (isGodAdmin(userId)) return true

  if (!isAdmin) return false

  const { admin } = event

  if (!admin) return false

  return admin.includes(userId)
}
