import React from "react"
import { Info as InfoIcon } from "lucide-react"

interface AuthErrorProps {
  info?: string
}

export const Info = ({ info }: AuthErrorProps): React.ReactElement => {
  if (!info) {
    return null
  }

  return (
    <div className="rounded-md bg-green-100 p-4 dark:bg-green-800">
      <div className="flex">
        <div className="flex-shrink-0">
          <InfoIcon
            className="h-5 w-5 text-green-600 dark:text-green-200"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-200">
            {info}
          </h3>
        </div>
      </div>
    </div>
  )
}
