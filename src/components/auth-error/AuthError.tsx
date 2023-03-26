import React from "react"
import { AlertTriangle } from "lucide-react"

export type AuthErrorTypes = "CredentialsSignin" | "AccessDenied"

interface AuthErrorProps {
  error?: AuthErrorTypes
}

export const AuthError = ({ error }: AuthErrorProps): React.ReactElement => {
  if (!error) {
    return null
  }

  let errorText = error || "An unknown error occurred."
  if (error === "CredentialsSignin") {
    errorText = "Your username & password do not match."
  } else if (error === "AccessDenied") {
    errorText = "Mobile number not verified."
  }

  return (
    <div className="rounded-md bg-red-50 p-4 dark:bg-red-800">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle
            className="h-5 w-5 text-red-400 dark:text-red-200"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-600 dark:text-red-200">
            {errorText}
          </h3>
        </div>
      </div>
    </div>
  )
}
