import { sendSMS as awsSendSMS } from "./aws-sns"
import { sendSMS as twilioSendSMS } from "./twilio"

type SendSmsParams = {
  provider: "aws" | "twilio"
  message: string
  to: string
}

export const sendSMS = async ({ provider, message, to }: SendSmsParams) => {
  return provider === "aws"
    ? awsSendSMS(to, message)
    : twilioSendSMS(to, message)
}
