import * as React from "react"
import Link from "next/link"
import useTranslation from "next-translate/useTranslation"

import { NavItem } from "@/src/types/nav"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import { Icons } from "@/src/components/icons"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { t } = useTranslation("common")
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {t("site-name")}
        </span>
      </Link>
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
            <Button
              variant="ghost"
              className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
            >
              <Icons.logo className="mr-2 h-4 w-4" />{" "}
              <span className="font-bold">{t("site-name")}</span>
            </Button>
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
