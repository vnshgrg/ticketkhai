import { PublishCommand, SNSClient } from "@aws-sdk/client-sns"

const SNS = new SNSClient({
  region: "ap-northeast-1",
  apiVersion: "2010-03-31",
})

export const sendSMS = async (number: string, message: string) => {
  try {
    // set sms to number
    const smsCommand = new PublishCommand({
      PhoneNumber: number,
      Message: message,
    })

    const result = await SNS.send(smsCommand)
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
