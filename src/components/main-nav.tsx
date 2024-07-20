import * as React from "react"
import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import { NavItem } from "@/src/types/nav"
import { cn } from "@/src/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { TicketKhaiLogo } from "./logo"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { t } = useTranslation("common")

  return (
    <div className="flex gap-6 md:gap-10">
      <div className="hidden sm:inline">
        <TicketKhaiLogo className="text-slate-700 hover:text-slate-800" />
      </div>
      {items?.length ? (
        <nav className="hidden gap-x-12 gap-y-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {t(item.key)}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="sm:hidden">
              <TicketKhaiLogo />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={24}
            className="w-[300px] overflow-scroll"
          >
            {items?.map(
              (item, index) =>
                item.href && (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{t(item.key)}</Link>
                  </DropdownMenuItem>
                )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
