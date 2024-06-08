import {
  retrieveCheckoutSession,
  retrievePaymentIntent,
} from "./checkoutSession"

export const fetchNextAction = async (sessionId) => {
  try {
    if (!sessionId) {
      return null
    }
    const checkoutSession = await retrieveCheckoutSession(sessionId)
    const paymentIntent = await retrievePaymentIntent(
      checkoutSession.payment_intent
    )
    return paymentIntent.next_action
  } catch (error) {
    return null
  }
}
