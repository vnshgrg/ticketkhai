import React from "react"
import { Label as ILabel } from "@/src/types"
import { AlertTriangleIcon } from "lucide-react"

import { Label } from "@/src/components/ui/label"

export interface RadioItem {
  label: string
  value: string
}

export interface RadioGroupProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue"
  > {
  name: string
  value?: RadioItem
  defaultValue?: RadioItem
  options: RadioItem[]
  label?: ILabel
  error?: string
  supportingText?: string
  register: any
}

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      label,
      name,
      supportingText,
      error,
      options,
      value,
      defaultValue,
      register,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <>
        <div>
          {label && (
            <Label htmlFor={label.for} className="cursor-pointer">
              {label.label}
            </Label>
          )}
          {supportingText && (
            <div className="text-sm text-slate-500">{supportingText}</div>
          )}
          <fieldset className="my-2">
            <legend className="sr-only">{name}</legend>
            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
              {options.map((option) => (
                <div key={option.label} className="flex items-center">
                  <input
                    id={option.value}
                    type="radio"
                    defaultChecked={option.value === value?.value}
                    className="h-4 w-4 border-slate-300 bg-slate-50 text-slate-500 focus:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-600 dark:focus:ring-slate-600"
                    ref={forwardedRef}
                    name={name}
                    value={option.value}
                    {...register(name)}
                    {...props}
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-3 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          {error && (
            <div className="flex items-center text-sm text-red-500 dark:text-red-400">
              <AlertTriangleIcon className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}
        </div>
      </>
    )
  }
)

RadioGroup.displayName = "RadioGroup"
