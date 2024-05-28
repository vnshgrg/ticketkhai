import React, { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { BanknotesIcon } from "@heroicons/react/24/outline"
import { XIcon } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import { ConfirmPurchase } from "@/src/config/events"
import { Button } from "../ui/button"

export const PurchasConfirmDialog: React.FC<{
  details?: ConfirmPurchase
  disabled: boolean
  onClick: () => void
}> = ({ details, disabled, onClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation("common")

  const { title, subtitle, description } = details

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const finalize = () => {
    closeModal()
    onClick()
  }

  return (
    <>
      <Button
        type="submit"
        onClick={openModal}
        className="w-full flex flex-row items-center"
        size="lg"
        disabled={disabled}
      >
        <BanknotesIcon className="mr-2 w-5 h-5" />
        {t("confirm-and-pay")}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-4 md:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>

                  <div className="flex flex-col space-y-3 mt-4">
                    <Button
                      variant="destructive"
                      onClick={finalize}
                      className="w-full flex flex-row items-center"
                      disabled={disabled}
                    >
                      <BanknotesIcon className="mr-2 w-5 h-5" />
                      Buy ticket for {subtitle}
                    </Button>
                    <Button
                      variant="subtle"
                      onClick={closeModal}
                      className="w-full flex flex-row items-center"
                    >
                      <XIcon className="mr-2 w-5 h-5" />
                      {t("cancel")}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
