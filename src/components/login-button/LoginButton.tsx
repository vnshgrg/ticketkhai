import { useRouter } from "next/router"
import {
  Brush,
  Contact,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import useTranslation from "next-translate/useTranslation"

import { Icons } from "@/src/components/icons"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

export const LoginButton = () => {
  const { data: session } = useSession()
  const { setTheme } = useTheme()
  const { t } = useTranslation("common")
  const router = useRouter()

  if (session) {
    const { email, name } = session.user
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">{name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" forceMount>
          {/* <DropdownMenuLabel>
            <div>My Account</div>
            <span className="text-xs font-normal">{email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
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
          {/* <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Brush className="mr-2 h-4 w-4" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setTheme("light")}
                >
                  <Icons.sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setTheme("dark")}
                >
                  <Icons.moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setTheme("system")}
                >
                  <Icons.laptop className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}
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
