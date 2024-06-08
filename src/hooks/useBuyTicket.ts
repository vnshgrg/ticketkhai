import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const buyTicket = z
  .object({
    ticketType: z
      .string()
      .min(1, { message: "You must choose one ticket type." }),
    numberOfTickets: z
      .string()
      .min(1, { message: "You must select at least one ticket." }),
  })
  .superRefine(({ numberOfTickets }, ctx) => {
    if (isNaN(parseInt(numberOfTickets))) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid No. of tickets.",
        path: ["numberOfTickets"],
      })
    }
  })
export type BuyTicket = z.infer<typeof buyTicket>

export const useBuyTicket = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState, control, setValue } =
    useForm<BuyTicket>({
      resolver: zodResolver(buyTicket),
      mode: "all",
      shouldFocusError: true,
      defaultValues: {
        numberOfTickets: "1",
      },
    })

  const { errors } = formState

  const incrementTicketCount = () => {
    const currentCount = parseInt(watch("numberOfTickets"))
    if (currentCount < 20) setValue("numberOfTickets", `${currentCount + 1}`)
  }

  const decrementTicketCount = () => {
    const currentCount = parseInt(watch("numberOfTickets"))
    if (currentCount > 1) setValue("numberOfTickets", `${currentCount - 1}`)
  }

  return {
    register,
    watch,
    errors,
    setValue,
    control,
    handleSubmit,
    incrementTicketCount,
    decrementTicketCount,
  }
}
