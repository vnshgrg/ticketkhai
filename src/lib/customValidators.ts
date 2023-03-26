import moment from "moment"
import { z } from "zod"

export const dobValidator = (val, ctx) => {
  if (val.length < 10) {
    return val
  }

  const newValue = val.slice(0, 10)

  const momentValue = moment(newValue, "YYYY/MM/DD")
  const checkValue = moment().subtract(16, "years")

  if (!momentValue.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: "Please provide a valid date.",
    })
    return z.NEVER
  }

  if (momentValue > checkValue) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: "You must be older than 16 years old.",
    })
    return z.NEVER
  }

  return newValue
}

export const futureDateValidator = (val, ctx) => {
  if (val.length < 10) {
    return val
  }

  const newValue = val.slice(0, 10)

  const momentValue = moment(newValue, "YYYY/MM/DD")
  const checkValue = moment()

  if (!momentValue.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: "Please provide a valid date.",
    })
    return z.NEVER
  }

  if (momentValue < checkValue) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: "Your visa expiry date must be a future date.",
    })
    return z.NEVER
  }

  return newValue
}

export const GenderValidator = z.enum(["male", "female", "doNotDisclose"], {
  required_error: "Please select one of the options.",
  invalid_type_error: "Please select one of the options.",
})

export const EmploymentTypeValidator = z.enum(
  ["full-time", "contract", "part-time"],
  {
    required_error: "Please select one of the options.",
    invalid_type_error: "Please select one of the options.",
  }
)
