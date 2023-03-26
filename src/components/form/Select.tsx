import React, { Fragment, InputHTMLAttributes } from "react"
import { Label, SelectOptionAccessor } from "@/src/types"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { AlertTriangleIcon } from "lucide-react"
import { Controller } from "react-hook-form"

import { cn } from "@/src/lib/utils"

export interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: Label
  error?: string
  supportingText?: string
  options: any
  accessor: SelectOptionAccessor
  control: any
}

export const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  (
    { label, error, supportingText, options, accessor, control, ...restProps },
    forwardedRef
  ) => {
    const { name, className } = restProps

    const errorInputClass =
      "border-red-300 focus:border-red-300 focus:ring-red-400 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-500"

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className="grid w-full items-center gap-2">
            <Listbox
              value={value}
              onChange={(value) => {
                onChange(value[accessor.value])
              }}
            >
              {({ open }) => (
                <>
                  {label && (
                    <Listbox.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {label.label}
                    </Listbox.Label>
                  )}
                  <div className="relative mt-1">
                    <Listbox.Button
                      className={cn(
                        "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-50 dark:focus:border-slate-600 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-900",
                        error && errorInputClass,
                        className
                      )}
                    >
                      <span className="block truncate">
                        {value &&
                          options.filter(
                            (option) => option[accessor.value] === value
                          )[0][accessor.label]}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option) => (
                          <Listbox.Option
                            key={option[accessor.value]}
                            className={({ active }) =>
                              cn(
                                "relative cursor-default select-none py-3 pl-3 pr-9",
                                active
                                  ? "bg-slate-700 text-slate-200"
                                  : "text-slate-800 dark:text-slate-400"
                              )
                            }
                            value={option}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={cn(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {option[accessor.label]}
                                </span>

                                {selected && (
                                  <span
                                    className={cn(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
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
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                  {error && (
                    <div className="flex items-center text-sm text-red-500 dark:text-red-400">
                      <AlertTriangleIcon className="mr-2 h-4 w-4" />
                      {error}
                    </div>
                  )}
                  {supportingText && (
                    <div className="text-sm text-slate-500">
                      {supportingText}
                    </div>
                  )}
                </>
              )}
            </Listbox>
          </div>
        )}
      />
    )
  }
)

Select.displayName = "Select"
