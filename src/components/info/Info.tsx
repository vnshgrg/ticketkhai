import React from "react"
import { cn } from "@/src/lib"
import { AlertTriangle, Info as InfoIcon } from "lucide-react"

interface AuthErrorProps {
  info?: string
  error?: string
}

export const Info = ({ info, error }: AuthErrorProps): React.ReactElement => {
  let containerStyle, icon, textStyle, text

  if (!info && !error) {
    return null
  }

  if (info) {
    containerStyle = "bg-green-100 p-4 dark:bg-green-800"
    icon = (
      <InfoIcon
        className={cn("h-5 w-5", "text-green-600 dark:text-green-200")}
        aria-hidden="true"
      />
    )
    textStyle = "text-green-700 dark:text-green-200"
    text = info
  }
  if (error) {
    containerStyle = "bg-red-100 p-4 dark:bg-red-800"
    icon = (
      <AlertTriangle
        className={cn("h-5 w-5", "text-red-600 dark:text-red-200")}
        aria-hidden="true"
      />
    )
    textStyle = "text-red-700 dark:text-red-200"
    text = error
  }

  return (
    <div className={cn("rounded-md", containerStyle)}>
      <div className="flex">
        <div className="shrink-0">{icon}</div>
        <div className="ml-3">
          <h3 className={cn("text-sm font-medium", textStyle)}>{text}</h3>
        </div>
      </div>
    </div>
  )
}
