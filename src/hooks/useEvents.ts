import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import qs from "qs"

import { demoEvents } from "../config/events"
import { siteConfig } from "../config/site"

export const useEvents = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [ticketPurchaseLoading, setTicketPurchaseLoading] =
    useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/events/query/active")
      if (data.result) {
        setData(data)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error?.message ||
          "An unknown error occurred."
      )
    } finally {
      setLoading(false)
    }
  }

  const purchaseTicket = async ({ eventId, ticketId, noOfTickets }) => {
    console.log({ eventId, ticketId, noOfTickets })

    try {
      setLoading(true)
      const response = await axios.post("/api/events/mutation/buy-ticket", {
        eventId,
        ticketId,
        noOfTickets,
      })

      console.log(response)
      if (response?.data?.data?.session_url) {
        router.push(response?.data?.data?.session_url)
      } else {
        setError("An unknown error occurred. Please try again later.")
      }
    } catch (error) {
      console.log(error)
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "An unknown error occurred."
      )
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    data,
    purchaseTicket,
    ticketPurchaseLoading,
  }
}
