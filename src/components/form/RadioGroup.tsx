import React from "react"
import { Label as ILabel } from "@/src/types"
import { AlertTriangleIcon } from "lucide-react"

import { Label } from "@/src/components/ui/label"

export interface RadioItem {
  label: string
  price?: string
  secondaryLabel?: string
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
      <div className="block">
        {label && (
          <Label
            htmlFor={label.for}
            className="flex items-center text-sm font-semibold text-slate-500 uppercase mb-2 cursor-pointer"
          >
            {label.label}
          </Label>
        )}
        {supportingText && (
          <div className="text-sm text-slate-500">{supportingText}</div>
        )}
        <fieldset className="mt-3 w-full">
          <legend className="sr-only">{name}</legend>
          <div className="flex flex-col items-start space-y-4">
            {options.map((option) => {
              const isSelected = option.value === value?.value
              return (
                <div
                  key={option.label}
                  className={`pl-3 w-full flex items-start rounded-lg ${
                    isSelected ? `bg-slate-100` : `hover:bg-slate-50`
                  }`}
                >
                  <input
                    id={option.value}
                    type="radio"
                    defaultChecked={isSelected}
                    className="h-4 w-4 mt-4 border-slate-300 bg-slate-50 text-slate-500 focus:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-600 dark:focus:ring-slate-600"
                    ref={forwardedRef}
                    name={name}
                    value={option.value}
                    {...register(name)}
                    {...props}
                  />
                  <label
                    htmlFor={option.value}
                    className="w-full flex items-center justify-between px-3 py-3 leading-none cursor-pointer peer-disabled:opacity-70"
                  >
                    <span>
                      <span className="font-semibold text-base">
                        {option.label}
                      </span>
                      {option.secondaryLabel && (
                        <span className="block text-sm mt-1">
                          {option.secondaryLabel}
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-lg">
                      {option.price}
                    </span>
                  </label>
                </div>
              )
            })}
          </div>
        </fieldset>
        {error && (
          <div className="flex items-center text-sm text-red-500 dark:text-red-400">
            <AlertTriangleIcon className="mr-2 h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = "RadioGroup"
