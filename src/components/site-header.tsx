import { LanguageSwitcher } from "@/src/components"

import { siteConfig } from "@/src/config/site"
import { MainNav } from "@/src/components/main-nav"
import { LoginButton } from "./login-button"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-40 w-full backdrop-blur-xl bg-white/80">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <LanguageSwitcher />
            <LoginButton />
          </nav>
        </div>
      </div>
    </header>
  )
}
