import React from "react"
import { Label as ILabel } from "@/src/types"
import { AlertTriangleIcon } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Input as InputComponent } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ILabel
  error?: string
  supportingText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, supportingText, ...props }, forwardedRef) => {
    const errorInputClass =
      "border-red-300 focus:border-red-300 focus:ring-red-400 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-500"
    return (
      <div className="grid w-full items-center gap-2">
        <>
          {label && (
            <Label htmlFor={label.for} className="cursor-pointer">
              {label.label}
            </Label>
          )}
          <InputComponent
            ref={forwardedRef}
            className={cn("w-full", error && errorInputClass)}
            {...props}
          />

          {error && (
            <div className="flex items-center text-sm text-red-500 dark:text-red-400">
              <AlertTriangleIcon className="mr-2 h-4 w-4" />
              {error}
            </div>
          )}

          {supportingText && (
            <div className="text-sm text-slate-500">{supportingText}</div>
          )}
        </>
      </div>
    )
  }
)

Input.displayName = "Input"
