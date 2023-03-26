import type { NextApiRequest, NextApiResponse } from "next"
import { matchPassword, newUUID, signJWT } from "@/src/utils/auth"
import { DB } from "@/src/utils/db"
import { Role, User } from "@prisma/client"
import { parsePhoneNumber } from "libphonenumber-js"
import omit from "lodash/omit"
import pick from "lodash/pick"
import moment from "moment"

export interface UserLoginParams {
  username: string
  password: string
}

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "POST":
      const { username, password }: Partial<UserLoginParams> = body

      const parsedMobile = parsePhoneNumber(username, "JP")

      // check if user is already registered
      const users = await DB.user.findMany({
        where: {
          mobile: parsedMobile.number,
          deletedAt: null,
        },
        include: {
          accounts: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      })
      if (!users || users.length === 0) {
        res
          .status(400)
          .json({ error: true, code: "0003", message: "Invalid credentials." })
        return
      }

      // CHECK PASSWORD
      let authenticatedUser: User & { accountId: string; role: Role }

      users.map((user) => {
        if (matchPassword(password, user.password)) {
          const { id: accountId, role } = user.accounts[0]
          delete user.accounts
          authenticatedUser = { ...user, accountId, role }
        }
      })
      if (!authenticatedUser) {
        res
          .status(400)
          .json({ error: true, code: "0003", message: "Invalid credentials." })
        return
      }

      if (authenticatedUser.mobileVerified === null) {
        res.status(400).json({
          error: true,
          code: "0003",
          message: "Please verify your mobile.",
        })
        return
      }

      // sign accessToken and refreshToken
      const sessionToken = newUUID()
      const accessToken = signJWT({
        ...pick(authenticatedUser, [
          "id",
          "name",
          "email",
          "mobile",
          "role",
          "accountId",
        ]),
      })

      const newSession = await DB.session.create({
        data: {
          userId: authenticatedUser.id,
          expires: moment().add(30, "days").toDate(),
          sessionToken,
          accessToken,
        },
      })

      const refreshToken = signJWT({
        userId: authenticatedUser.id,
        sessionId: newSession.id,
      })

      res.status(200).json({
        user: omit(authenticatedUser, [
          "password",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "emailVerified",
          "mobileVerified",
        ]),
        accessToken,
        refreshToken,
        emailVerified: authenticatedUser.emailVerified ? true : false,
        mobileVerified: authenticatedUser.mobileVerified ? true : false,
      })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default registerHandler
