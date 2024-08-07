import { Fragment, useState } from "react"
import { useRouter } from "next/router"
import { Dialog, Transition } from "@headlessui/react"
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
  QuestionMarkCircleIcon,
  TicketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import useTranslation from "next-translate/useTranslation"

import { TicketKhaiLogo } from "../logo"

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "home", href: "/", icon: HomeIcon, current: false },
  {
    name: "my-tickets",
    href: "/user/tickets",
    icon: TicketIcon,
    current: false,
  },
]
const secondaryNavigation = [
  {
    name: "help",
    href: "mailto:info@ticketkhai.com",
    icon: QuestionMarkCircleIcon,
  },
  { name: "logout", href: "/api/auth/signout", icon: ArrowLeftOnRectangleIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function UserLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()
  const { pathname: currentPath } = router

  const { t } = useTranslation("common")

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-600 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 dark:bg-slate-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-full focus:bg-slate-600 focus:outline-none dark:bg-slate-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center pt-6 px-4">
                  <TicketKhaiLogo className="text-slate-700 hover:text-slate-800" />
                </div>
                <div className="mt-4 h-0 flex-1 overflow-y-auto">
                  <nav className="flex h-full flex-col">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "border-slate-600 bg-slate-200 text-slate-600 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-300"
                              : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                            "group flex items-center border-l-4 py-2 px-3 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-slate-500"
                                : "text-slate-400 group-hover:text-slate-500",
                              "mr-4 h-6 w-6 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {t(`nav-${item.name}`)}
                        </a>
                      ))}
                    </div>
                    <div className="mt-auto space-y-1 pt-10">
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                            aria-hidden="true"
                          />
                          {t(`nav-${item.name}`)}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="container flex items-center">
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <nav className="mt-16 flex grow flex-col overflow-y-auto border-r border-slate-200 py-4 dark:border-slate-700">
            <div className="grow">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.href.startsWith(currentPath)
                        ? " text-slate-700 dark:text-slate-300 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300",
                      "group flex items-center py-2 px-3 text-sm font-medium"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.href.startsWith(currentPath)
                          ? "text-slate-500 dark:text-slate-400"
                          : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400",
                        "mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {t(`nav-${item.name}`)}
                  </a>
                ))}
              </div>
            </div>
            <div className="block w-full shrink-0">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-slate-600  hover:text-slate-900"
                >
                  <item.icon
                    className="mr-3 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                    aria-hidden="true"
                  />
                  {t(`nav-${item.name}`)}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Content area */}
        <div className="w-full lg:pl-64">
          <div className="lg:px-6">
            <div className="mx-auto flex flex-col lg:max-w-3xl">
              <div className="sm:hidden flex top-0 z-10 flex-row shrink-0 h-12 mt-4 -ml-3">
                <button
                  type="button"
                  className="p-3 rounded-lg text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <main className="flex-1 pt-0 sm:pt-8">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
