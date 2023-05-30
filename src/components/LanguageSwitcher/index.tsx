import { Fragment, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDown } from "lucide-react"

const languageNames = {
  en: "English",
  jp: "日本語",
}

export const LanguageSwitcher = () => {
  const router = useRouter()

  const handleLocaleChange = (newLocale) => {
    router.push(router.pathname, router.asPath, {
      locale: newLocale,
    })
  }

  const renderName = (locale) => {
    let code
    if (locale === "en") {
      code = "USA"
    } else if (locale === "jp") {
      code = "JPN"
    } else if (locale === "np") {
      code = "NPL"
    }
    return <div className="flex items-center">{languageNames[locale]}</div>
  }

  return (
    <div className="z-10 mr-1 text-right md:mr-0">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="group inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {renderName(router.locale)}
            <ChevronDown
              className="ml-2 -mr-1 h-5 w-5 text-slate-600 group-hover:text-slate-700"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-0 ring-transparent ring-opacity-5 focus:outline-none">
            <div className="space-y-1 p-1">
              {router.locales.map((locale, index) => {
                const active = router.locale === locale ? true : false
                return (
                  <Menu.Item key={index.toString()}>
                    <>
                      <button
                        onClick={() => handleLocaleChange(locale)}
                        className={`${
                          active
                            ? "bg-slate-200 text-slate-800"
                            : "text-slate-700 hover:bg-slate-100"
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      >
                        {renderName(locale)}
                      </button>
                    </>
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
