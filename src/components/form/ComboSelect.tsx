import React, { InputHTMLAttributes, useState } from "react"
import { Label, SelectOptionAccessor } from "@/src/types"
import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { AlertTriangleIcon } from "lucide-react"
import { Controller } from "react-hook-form"

import { cn } from "@/src/lib/utils"

export interface ComboSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: Label
  error?: string
  supportingText?: string
  options: any
  accessor: SelectOptionAccessor
  control: any
}

export const ComboSelect = React.forwardRef<HTMLInputElement, ComboSelectProps>(
  (
    { label, error, supportingText, options, accessor, control, ...restProps },
    forwardedRef
  ) => {
    const [query, setQuery] = useState<string>("")

    const filteredOptions =
      query === ""
        ? options
        : options.filter((option) => {
            return option[accessor.label]
              .toLowerCase()
              .includes(query.toLowerCase())
          })

    if (options.length === 0) return null

    const { name, className } = restProps

    const errorInputClass =
      "border-red-300 focus:border-red-300 focus:ring-red-400 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-500"

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Combobox
            as="div"
            value={value}
            onChange={(value) => {
              onChange(value[accessor.value])
            }}
            className="grid w-full items-center gap-2"
            ref={forwardedRef}
          >
            {label && (
              <Combobox.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label.label}
              </Combobox.Label>
            )}
            <div className="relative mt-1">
              <Combobox.Input
                className={cn(
                  "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-50 dark:focus:border-slate-600 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-900",
                  error && errorInputClass,
                  className
                )}
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(value) => {
                  if (!value) return ""

                  return options.filter(
                    (option) => option[accessor.value] === value
                  )[0][accessor.label]
                }}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {filteredOptions.length > 0 && (
                // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option[accessor.value]}
                      value={option}
                      className={({ active }) =>
                        cn(
                          "relative cursor-default select-none py-3 pl-3 pr-9",
                          active
                            ? "bg-slate-700 text-slate-200"
                            : "text-slate-800 dark:text-slate-400"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={cn(
                              "block truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {option[accessor.label]}
                          </span>

                          {selected && (
                            <span
                              className={cn(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
            {error && (
              <div className="flex items-center text-sm text-red-500 dark:text-red-400">
                <AlertTriangleIcon className="mr-2 h-4 w-4" />
                {error}
              </div>
            )}
            {supportingText && (
              <div className="text-sm text-slate-500">{supportingText}</div>
            )}
          </Combobox>
        )}
      />
    )
  }
)

ComboSelect.displayName = "ComboSelect"
