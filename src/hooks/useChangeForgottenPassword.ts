import React from "react"
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const changeForgottenPassword = z.object({
  token: z.string().min(4, { message: "Verification code is 4 digits long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
})
export type ChangeForgottenPassword = z.infer<typeof changeForgottenPassword>

export const useChangeForgottenPassword = (identifier: string) => {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const { register, handleSubmit, watch, formState, control, setValue } =
    useForm<ChangeForgottenPassword>({
      resolver: zodResolver(changeForgottenPassword),
      mode: "all",
      shouldFocusError: true,
    })

  const { errors } = formState

  const onSubmit: SubmitHandler<ChangeForgottenPassword> = async (
    formValues
  ) => {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/user/change-forgotten-password", {
        ...formValues,
        identifier,
      })
      if (data.result) {
        router.replace({
          pathname: "/login",
          query: {
            info: "Password changed.",
          },
        })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error)

      router.replace({
        pathname: `/forgot-password/change-password`,
        query: {
          identifier,
          error: error.response?.data.message || "An error occurred.",
        },
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
