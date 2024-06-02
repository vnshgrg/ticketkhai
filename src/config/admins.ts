import { isProduction } from "../utils"

const productionAdmins = {
  avinash: "cli5ywph50000le0frjjmaaeh",
  dipesh: "cli6vp3gc0000l00gxbeoue0b",
  suvash: "clikcmdzp0000mm0ft2016867",
}

const devAdmins = {
  avinash: "clfy7d1o400027ap7l0qyepin",
  dipesh: "clhvg96he0000l30f56u8stu1",
  suvash: "cluz7wr8r0000gy0fmbvlsstg",
}

export const admins = isProduction ? productionAdmins : devAdmins

const isGodAdmin = (userId: string) =>
  userId === admins.avinash || userId === admins.dipesh

export const isAdmin = (userId: string) => {
  if (isGodAdmin(userId)) return true
  return !!Object.values(admins).find((id) => id === userId)
}
