import { useRouter } from "next/router"
import {
  Contact,
  FileTextIcon,
  LogIn,
  LogOut,
  ScanLine,
  User,
} from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import useTranslation from "next-translate/useTranslation"

import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

export const LoginButton = () => {
  const { data: session, status } = useSession()
  const { setTheme } = useTheme()
  const { t } = useTranslation("common")
  const router = useRouter()

  if (session) {
    const { mobile, name, role } = session.user
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">{name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" forceMount>
          <DropdownMenuLabel>
            <div>My Account</div>
            <span className="text-xs font-normal text-slate-500">{mobile}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push("/user/my-tickets")
            }}
          >
            <Contact className="mr-2 h-4 w-4" />
            <span>{t("nav-mypage")}</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>

          {role === "admin" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <div>Admin</div>
                {/* <span className="text-xs font-normal">{email}</span> */}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push("/admin/list")
                }}
              >
                <FileTextIcon className="mr-2 h-4 w-4" />
                <span>Sales Report</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  router.push("/admin/scanner")
                }}
              >
                <ScanLine className="mr-2 h-4 w-4" />
                <span>Scanner</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("auth-logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => signIn()}>
        <LogIn className="mr-2 h-5 w-5" />
        <span>{t("auth-login")}</span>
      </Button>
    </>
  )
}
