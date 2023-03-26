import { useState } from "react"
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { parsePhoneNumber } from "libphonenumber-js"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const verify = z
  .object({
    mobile: z.string().min(1, { message: "Mobile number is required." }),
    code: z
      .string()
      .min(1, { message: "Verification code is required." })
      .max(4, { message: "Verification code too long." }),
  })
  .superRefine(({ mobile }, ctx) => {
    if (mobile) {
      try {
        const phoneNumber = parsePhoneNumber(mobile || "", "JP")
        if (!phoneNumber || !phoneNumber.isValid()) {
          ctx.addIssue({
            code: "custom",
            message: "Please provide a valid Japanese mobile number.",
            path: ["mobile"],
          })
        }
      } catch (error) {
        ctx.addIssue({
          code: "custom",
          message: "Please provide a valid Japanese mobile number.",
          path: ["mobile"],
        })
      }
    }
  })
export type Verify = z.infer<typeof verify>

export const useVerify = ({ defaultValues, type }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string>("")

  const router = useRouter()

  const { register, handleSubmit, watch, formState, control, setValue, reset } =
    useForm<Verify>({
      resolver: zodResolver(verify),
      mode: "all",
      shouldFocusError: true,
      defaultValues: defaultValues || {},
    })

  const { errors } = formState

  const onSubmit: SubmitHandler<Verify> = async (formValues) => {
    console.log("[onSubmit]:", formValues)
    const { mobile, code } = formValues
    try {
      // Delete unnecessary data
      // signIn("credentials", formValues)
      console.log(formValues, type)
      setLoading(true)
      const { data } = await axios.post("/api/user/verify", {
        type,
        mobile,
        code,
      })
      if (data.result) {
        router.replace({
          pathname: "/login",
          query: {
            info: data.message,
          },
        })
      } else {
        setApiError(data.message)
      }
      reset()
    } catch (error) {
      console.log("Error:", error.response?.data || error)
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
    apiError,
    loading,
  }
}
