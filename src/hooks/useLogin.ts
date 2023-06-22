import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const login = z.object({
  username: z.string().min(1, { message: "Mobile number is required." }),
  password: z.string().min(1, { message: "password is required." }),
})
export type Login = z.infer<typeof login>

export const useLogin = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState, control, setValue } =
    useForm<Login>({
      resolver: zodResolver(login),
      mode: "all",
      shouldFocusError: true,
    })

  const { errors } = formState

  const onSubmit: SubmitHandler<Login> = async (formValues) => {
    try {
      debugger
      const { ok, error, url } = await signIn("credentials", {
        ...formValues,
        redirect: false,
      })
      debugger
      if (!ok) {
        router.replace({ pathname: "/login", query: { error } })
        return
      } else {
        router.replace({ pathname: "/" })
        return
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error)
      router.replace({
        pathname: "/login",
        query: { error: error.response?.data.message || "An error occurred." },
      })
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
  }
}
