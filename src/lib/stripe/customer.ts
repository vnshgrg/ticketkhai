import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2022-11-15",
})

export const searchCustomer = async (userId: string) => {
  try {
    const { data: customer } = await stripe.customers.search({
      query: `metadata['userId']:'${userId}'`,
    })
    if (customer && customer.length > 0) {
      return customer[0]
    }
    return null
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Error while searching customer.")
  }
}

export const createCustomer = async (userId, { name, mobile }) => {
  try {
    const customer = await stripe.customers.create({
      name,
      phone: mobile,
      metadata: {
        userId,
      },
    })
    return customer
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Error while creating customer.")
  }
}

export const getCustomerById = async (customerId: string) => {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    return customer
  } catch (error) {
    console.log(error)
    throw new Error(error.message || "Error while retrieving customer.")
  }
}
