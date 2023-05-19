import twilio from "twilio"

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const sendSMS = async (number: string, message: string) => {
  try {
    console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    const result = client.messages.create({
      body: message,
      to: number,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    return result
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
