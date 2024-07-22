import { useCallback } from 'react'
import { useModalControls } from './modals'
import { useDialogStateControlContext } from './dialogs'
import { useSidebarControls } from './shell/sidebar'

/**
 * returns true if something was closed
 * (used by the android hardware back btn)
 */
export function useCloseAnyActiveElement() {
  const { closeModal } = useModalControls()
  const { closeAllDialogs } = useDialogStateControlContext()
  const { closeSidebar } = useSidebarControls()

  return useCallback(() => {
    if (closeAllDialogs()) {
      return true
    }
    if (closeModal()) {
      return true
    }
    closeSidebar()

    return false
  }, [closeModal, closeSidebar, closeAllDialogs])
}
