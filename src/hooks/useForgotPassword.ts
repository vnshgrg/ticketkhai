import React from "react"
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const forgotPassword = z.object({
  username: z.string().min(1, { message: "Mobile number is required." }),
})
export type Login = z.infer<typeof forgotPassword>

export const useForgotPassword = () => {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const { register, handleSubmit, watch, formState, control, setValue } =
    useForm<Login>({
      resolver: zodResolver(forgotPassword),
      mode: "all",
      shouldFocusError: true,
    })

  const { errors } = formState

  const onSubmit: SubmitHandler<Login> = async (formValues) => {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/user/forgot-password", {
        ...formValues,
      })
      const params = data.data

      router.replace({
        pathname: `/forgot-password/change-password`,
        query: params,
      })
    } catch (error) {
      router.replace({
        pathname: "/login",
        query: { error: error.response?.data.message || "An error occurred." },
      })
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
  }
}
