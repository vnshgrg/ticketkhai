import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2022-11-15",
})

export const retrieveCheckoutSession = async (sessionId) => {
  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
    return checkoutSession
  } catch (error) {
    return null
  }
}

export const retrievePaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return paymentIntent
  } catch (error) {
    console.log(error)
    return null
  }
}
