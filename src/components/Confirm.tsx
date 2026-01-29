import {Dialog, DialogPanel, DialogTitle, Description} from "@headlessui/react"
import Button from "./Button"

interface ConfirmProps {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function Confirm({open, title, message, onConfirm, onCancel}: ConfirmProps) {
  return (
    <Dialog open={open} onClose={onCancel} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Centered panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-lg bg-white dark:bg-gray-800 p-3 shadow-lg dark:shadow-xl space-y-4">
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white text-center">{title}</DialogTitle>
          <Description className="text-sm text-gray-600 dark:text-gray-300 text-center my-7">{message}</Description>

          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>

            <Button variant="danger" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
