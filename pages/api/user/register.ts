import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { encodePassword } from "@/src/utils/auth"
import { DB } from "@/src/utils/db"
import { randomNumber } from "@/src/utils/randomNumber"
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns"
import { Gender } from "@prisma/client"
import { parsePhoneNumber } from "libphonenumber-js"
import moment from "moment"

export interface UserCreateParams {
  email: string
  password: string
  firstName: string
  lastName: string
  firstNameKana: string
  lastNameKana: string
  dob: string
  gender: Gender
  mobile: string
}

const SNS = new SNSClient({
  region: "ap-northeast-1",
  apiVersion: "2010-03-31",
})

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { method, body } = req

  switch (method) {
    case "POST":
      const {
        firstName,
        lastName,
        firstNameKana,
        lastNameKana,
        password,
        mobile,
      }: Partial<UserCreateParams> = body
      // check if user is already registered
      const existingUser = await DB.user.findFirst({
        where: {
          OR: [{ mobile: mobile.trim() }],
        },
        select: { id: true },
      })

      if (existingUser) {
        res
          .status(400)
          .json({ error: true, code: "0001", message: "User already exists." })
        return
      }

      // // check and parse DOB
      // const dateOfBirth = moment(dob)
      // if (!dateOfBirth.isValid()) {
      //   res.status(400).json({
      //     error: true,
      //     code: "0002",
      //     message: "Invalid date of birth.",
      //   })
      //   return
      // }

      const parsedMobile = parsePhoneNumber(mobile, "JP")

      if (!parsedMobile.isValid()) {
        res.status(400).json({
          error: true,
          code: "0004",
          message: "Invalid mobile number.",
        })
        return
      }

      const providerAccountId = randomUUID()

      // Update or create data in your database
      await DB.account.create({
        data: {
          providerType: "credentials",
          providerId: "jrg",
          providerAccountId,
          user: {
            create: {
              name: `${lastName} ${firstName}`,
              firstName,
              lastName,
              firstNameKana,
              lastNameKana,
              mobile: parsedMobile.number,
              password: encodePassword(password),
            },
          },
        },
        select: {
          id: true,
        },
      })

      // create
      const { identifier, type, token, key } =
        await DB.verificationRequest.create({
          data: {
            identifier: parsedMobile.number,
            token: randomNumber(4),
            type: "mobile",
            expires: moment().add(24, "hours").toDate(),
          },
        })

      // set sms to number
      const smsCommand = new PublishCommand({
        PhoneNumber: identifier,
        Message: `Your JRG verification code is ${token}`,
      })

      try {
        console.log(identifier)
        const test = await SNS.send(smsCommand)
        console.log(test)
      } catch (error) {
        console.log(error)
      }

      res.status(200).json({
        result: true,
        message: "Registration successful.",
        data: { identifier, type, key },
      })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default registerHandler
