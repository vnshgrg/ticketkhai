import React, { useEffect, useRef, useState } from "react"
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
          playAudio(successAudio)
          setTicket(data)
        }
      } catch (err) {
        const error = err as AxiosError<{ result: boolean; message: string }>
        setError(error.response?.data?.message || "An error occurred.")
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

  return (
    <div className=" w-full ">
      <h3 className="text-center text-lg font-bold uppercase">
        Ticket scanner
      </h3>
      <div className="mt-8 w-full">
        <div className="w-full max-w-2xl mx-auto">
          <div
            id="reader"
            className="w-full overflow-hidden rounded-xl text-center"
          ></div>
        </div>
        {currentScanResult && (
          <div className="absolute inset-0 pt-8 px-4 h-full bg-white z-20 backdrop-blur-xl">
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
              <div className="mb-4 w-full max-w-xl mx-auto rounded-lg border border-green-400 bg-white p-4 space-y-4">
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    Ticket
                  </dt>
                  <dd className="uppercase">{ticket.id}</dd>
                </div>
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    Type
                  </dt>
                  <dd>
                    <span
                      className={`text-white uppercase px-3 py-1 rounded font-bold text-lg ${
                        ticket.title === "Couple"
                          ? `bg-red-600`
                          : `bg-slate-800`
                      }`}
                    >
                      {ticket.title}
                    </span>
                  </dd>
                </div>
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    Price
                  </dt>
                  <dd>{formatJPY(ticket.price)}</dd>
                </div>
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    User
                  </dt>
                  <dd>{ticket.user.name}</dd>
                </div>
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    Transaction
                  </dt>
                  <dd className="uppercase">
                    {ticket.transaction.id} / QTY {ticket.transaction.quantity}{" "}
                    / {ticket.transaction.status}
                  </dd>
                </div>
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    Purchase date time
                  </dt>
                  <dd>
                    {moment(ticket.createdAt).format("YYYY年MM月DD日 HH:mm")}
                  </dd>
                </div>
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    Event
                  </dt>
                  <dd>
                    {ticket.event.title} - {ticket.event.subtitle}
                  </dd>
                </div>
                <div className="">
                  <dt className="text-xs font-bold uppercase text-slate-500">
                    Event date
                  </dt>
                  <dd>
                    {moment(ticket.event.dateStart * 1000).format(
                      "YYYY年MM月DD日"
                    )}
                  </dd>
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Button variant="subtle" onClick={handleClear}>
                CLEAR
              </Button>
            </div>
          </div>
        )}
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
