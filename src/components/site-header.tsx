import { siteConfig } from "@/src/config/site"
import { MainNav } from "@/src/components/main-nav"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { LoginButton } from "./login-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <LoginButton />
          </nav>
        </div>
      </div>
    </header>
  )
}
