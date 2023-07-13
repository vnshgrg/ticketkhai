import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib"
import { formatJPY } from "@/src/utils"
import axios, { AxiosError } from "axios"
import { Html5QrcodeScanner } from "html5-qrcode"
import moment from "moment"

import { Button } from "../ui/button"

let scanner = null

export const Scanner = (): React.ReactElement => {
  const [currentScanResult, setCurrentScanResult] = useState<string | null>(
    null
  )
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const errorAudio = useRef()
  const scanSuccessAudio = useRef()
  const successAudio = useRef()

  useEffect(() => {
    if (!scanner) {
      scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      )

      scanner.render(onScanSuccess, onScanFailure)
    }
  }, [])

  useEffect(() => {
    const getTicket = async () => {
      try {
        setLoading(true)
        setError(null)
        const {
          data: { result, data },
        } = await axios.get(`/api/admin/ticket?id=${currentScanResult}`)
        if (result) {
          data.status === "available"
            ? playAudio(scanSuccessAudio)
            : playAudio(errorAudio)
          setTicket(data)
        }
      } catch (err) {
        const error = err as AxiosError<{ result: boolean; error: string }>
        console.log(error.response)
        setError(error.response?.data?.error || "An error occurred.")
        playAudio(errorAudio)
      } finally {
        setLoading(false)
      }
    }
    if (currentScanResult) {
      ;(!ticket || currentScanResult !== ticket.id) && getTicket()
    }
  }, [currentScanResult])

  const onScanSuccess = (decodedText) => {
    // handle the scanned code as you like, for example:
    if (!currentScanResult) {
      setCurrentScanResult(decodedText)
      scanner.pause()
    }
  }

  const onScanFailure = (error) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error = ${error}`)
  }

  const handleClear = () => {
    setCurrentScanResult(null)
    setTicket(null)
    setLoading(false)
    setError(null)
    if (scanner.getState() === 3) {
      scanner.resume()
    }
  }

  const playAudio = (ref) => {
    if (ref.current) {
      ref.current.play()
    }
  }

  const handleUse = async () => {
    try {
      setLoading(true)
      setError(null)
      const {
        data: { result, data },
      } = await axios.patch(`/api/admin/ticket?id=${currentScanResult}`)
      if (result) {
        setTicket(data)
        playAudio(successAudio)
      }
    } catch (err) {
      const error = err as AxiosError<{ result: boolean; error: string }>
      console.log(error.response)
      setError(error.response?.data?.error || "An error occurred.")
      playAudio(errorAudio)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" w-full ">
      <h3 className="text-center text-lg font-bold uppercase">
        Ticket scanner
      </h3>
      <div className="mt-8 grid w-full grid-cols-1 gap-x-0 sm:grid-cols-3 sm:gap-x-8">
        <div className="w-full">
          <div
            id="reader"
            className="w-full overflow-hidden rounded-xl text-center"
          ></div>
        </div>
        <div className="col-span-1 sm:col-span-2">
          {currentScanResult && (
            <div>
              <div className="flex items-center justify-center">
                {loading && (
                  <div className="animate mx-auto mb-4 inline-block animate-pulse rounded-lg bg-slate-200 px-4 py-2 text-center text-slate-600">
                    Please wait...
                  </div>
                )}
                {error && (
                  <div className="mx-auto mb-4 inline-block rounded-lg bg-red-100 px-4 py-2 text-center text-red-600">
                    {error}
                  </div>
                )}
              </div>
              {ticket && (
                <div className="mb-4 w-full rounded-lg border border-slate-200 bg-slate-100 py-4">
                  <table id="ticket-details" className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td>Ticket</td>
                        <td className="uppercase">{ticket.id}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td className="uppercase">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium${
                              ticket.status === "available" &&
                              " bg-green-100 text-green-700"
                            } ${
                              ticket.status === "used" &&
                              " bg-red-100 text-red-600"
                            } ${
                              ticket.status !== "available" &&
                              ticket.status !== "used" &&
                              "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Type</td>
                        <td>{ticket.title}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>{formatJPY(ticket.price)}</td>
                      </tr>
                      <tr>
                        <td>User</td>
                        <td>
                          {ticket.user.name} ({ticket.user.mobile})
                        </td>
                      </tr>
                      <tr>
                        <td>Transaction</td>
                        <td className="uppercase">
                          {ticket.transaction.id} / QTY{" "}
                          {ticket.transaction.quantity} /{" "}
                          {ticket.transaction.status}
                        </td>
                      </tr>
                      <tr>
                        <td>Purchase date time</td>
                        <td>
                          {moment(ticket.createdAt).format(
                            "YYYY年MM月DD日 HH:mm"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Event</td>
                        <td>
                          {ticket.event.title} - {ticket.event.subtitle}
                        </td>
                      </tr>
                      <tr>
                        <td>Event date</td>
                        <td>
                          {moment(ticket.event.dateStart * 1000).format(
                            "YYYY年MM月DD日"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-4 flex items-center justify-center space-x-4">
                <Button variant="default" onClick={handleUse}>
                  MARK AS USED
                </Button>
                <Button variant="subtle" onClick={handleClear}>
                  CLEAR
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <audio
        className="hidden opacity-0"
        ref={errorAudio}
        src="/audio/error.mp3"
      />
      <audio
        className="hidden opacity-0"
        ref={scanSuccessAudio}
        src="/audio/scan-success.mp3"
      />
      <audio
        className="hidden opacity-0"
        ref={successAudio}
        src="/audio/success.mp3"
      />
    </div>
  )
}
