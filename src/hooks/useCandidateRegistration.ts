import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { CountryCode, parsePhoneNumber } from "libphonenumber-js"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import {
  EmploymentTypeValidator,
  GenderValidator,
  dobValidator,
  futureDateValidator,
} from "@/src/lib/customValidators"

export type TGender = z.infer<typeof GenderValidator>

const basicRegistration = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    firstNameKana: z
      .string()
      .min(1, { message: "First name kana is required." })
      .regex(new RegExp("^$|[ぁ-んァ-ン]"), {
        message: "Only Hiragana or Katakana allowed.",
      }),
    lastNameKana: z
      .string()
      .min(1, { message: "Last name kana is required." })
      .regex(new RegExp("^$|[ぁ-んァ-ン]"), {
        message: "Only Hiragana or Katakana allowed.",
      }),
    dob: z
      .string()
      .min(1, { message: "Date of birth is required." })
      .transform(dobValidator),
    gender: GenderValidator,
    email: z
      .string()
      .min(1, { message: "Email address is required." })
      .email({ message: "Please provide a valid email address." }),
    confirmEmail: z
      .string()
      .min(1, { message: "Email confirmation is required." })
      .email({ message: "Please provide a valid email address." }),
    mobile: z.string().min(1, { message: "Mobile number is required." }),
    // .regex(new RegExp("^0[789]0-?d{4}-?d{4}$"), {
    //   message: "Please provide a valid mobile number.",
    // }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    nationality: z
      .string()
      .min(3, { message: "Please select your nationality." })
      .max(3, { message: "Please select your nationality." }),
    visa: z
      .string()
      .min(1, { message: "Please select current your visa type." })
      .optional(),
    visaExpiryDate: z
      .string()
      .min(1, { message: "Visa expiry date is required." })
      .transform(futureDateValidator)
      .optional(),
    desiredPrefecture: z
      .string()
      .min(1, { message: "Please select a prefecture." }),
    employmentType: EmploymentTypeValidator,
    japaneseLanguageLevel: z
      .string()
      .min(1, { message: "Please select your japanese language level." }),
    englishLanguageLevel: z
      .string()
      .min(1, { message: "Please select your english language level." }),
  })
  .superRefine(({ email, confirmEmail, nationality, visa, mobile }, ctx) => {
    if (email !== confirmEmail) {
      ctx.addIssue({
        code: "custom",
        message: "Email address mismatch.",
        path: ["confirmEmail"],
      })
    }

    if (nationality !== "JPN" && !visa) {
      ctx.addIssue({
        code: "custom",
        message: "Please select your visa type.",
        path: ["visa"],
      })
    }

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

export type BasicRegistration = z.infer<typeof basicRegistration>

export const useCandidateRegistration = () => {
  const { register, handleSubmit, watch, formState, control, setValue } =
    useForm<BasicRegistration>({
      resolver: zodResolver(basicRegistration),
      mode: "all",
      shouldFocusError: true,
      defaultValues: {
        firstName: "Avinash",
        lastName: "Ghale",
        firstNameKana: "アビナシュ",
        lastNameKana: "ガレ",
        email: "ghale.avinash@gmail.com",
        confirmEmail: "ghale.avinash@gmail.com",
        password: "wakeup",
        dob: "1993/05/15",
        gender: "male",
        nationality: "NPL",
        employmentType: "full-time",
        desiredPrefecture: "tokyo",
        visa: "student",
        visaExpiryDate: "2023/11/01",
        japaneseLanguageLevel: "n1",
        englishLanguageLevel: "fluent",
      },
    })

  const { errors } = formState

  const onSubmit: SubmitHandler<BasicRegistration> = async (formValues) => {
    // console.log("[onSubmit]:", formValues)
    const { email, password } = formValues

    // try {
    //   // Delete unnecessary data
    //   delete formValues.confirmEmail

    //   const { data } = await axios.post("/api/user/register", formValues)
    // } catch (error) {
    //   console.log("Error:", error.response?.data || error.message)
    // }
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
