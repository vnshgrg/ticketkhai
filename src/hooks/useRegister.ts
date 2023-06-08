import { useState } from "react"
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { parsePhoneNumber } from "libphonenumber-js"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const userRegistration = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  mobile: z.string().min(1, { message: "Mobile number is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
})

export type UserRegistration = z.infer<typeof userRegistration>

export const useRegistration = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string>("")

  const router = useRouter()

  const { register, handleSubmit, watch, formState, control, setValue, reset } =
    useForm<UserRegistration>({
      resolver: zodResolver(userRegistration),
      mode: "all",
      shouldFocusError: true,
    })

  const { errors } = formState

  const onSubmit: SubmitHandler<UserRegistration> = async (formValues) => {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/user/register", formValues)
      if (data.result) {
        router.replace({
          pathname: "/register/verify",
          query: data.data,
        })
        reset()
      } else {
        setApiError(data.message)
      }
      reset()
    } catch (error) {
      setApiError(
        error.response?.data?.message || error.message || "An error occurred."
      )
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    watch,
    errors,
    setValue,
    control,
    handleSubmit,
    onSubmit,
    loading,
    apiError,
  }
}
