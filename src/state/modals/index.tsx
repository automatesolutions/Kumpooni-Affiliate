import { useNonReactiveCallback } from '#/lib/hooks/useNonReactiveCallback'
import { ServiceLinePartSchema } from '#/modules/parts/parts.model'
import { serviceValidator } from '#/modules/services/services.model'
import React from 'react'
import * as z from 'zod'
import { partsValidator } from '../validations/parts'
import { StoreProfile } from '../queries/profile'

export interface WaitlistModal {
  name?: 'waitlist'
}

export interface ConfirmModal {
  name?: 'confirm'
}
export interface CreateOrEditPartModal {
  name?: 'create-or-edit-part'
  part: z.infer<typeof partsValidator>
  onUpdate?: () => void
}
export interface StoreProfileModal {
  name?: 'store-profile'
  profile: StoreProfile
}

export interface AccountSettingModal {
  name?: 'account-setting'
}
export interface ChangeEmailModal {
  name?: 'change-email'
}
export interface ChangePassword {
  name?: 'change-password'
}

export interface VerifyEmailModal {
  name?: 'verify-email'
  showReminder?: boolean
  onSuccess?: () => void
}
export type Modal =
  | WaitlistModal
  | ConfirmModal
  | CreateOrEditPartModal
  | StoreProfileModal
  | AccountSettingModal
  | ChangeEmailModal
  | VerifyEmailModal
  | ChangePassword
const ModalContext = React.createContext<{
  isModalActive: boolean
  activeModals: Modal[]
}>({
  isModalActive: false,
  activeModals: [],
})

const ModalControlContext = React.createContext<{
  openModal: (modal: Modal) => void
  closeModal: () => boolean
  closeAllModals: () => void
}>({
  openModal: () => {},
  closeModal: () => false,
  closeAllModals: () => {},
})

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [activeModals, setActiveModals] = React.useState<Modal[]>([])

  const openModal = useNonReactiveCallback((modal: Modal) => {
    setActiveModals(modals => [...modals, modal])
  })

  const closeModal = useNonReactiveCallback(() => {
    let wasActive = activeModals.length > 0
    setActiveModals(modals => {
      return modals.slice(0, -1)
    })
    return wasActive
  })

  const closeAllModals = useNonReactiveCallback(() => {
    setActiveModals([])
  })

  const state = React.useMemo(
    () => ({
      isModalActive: activeModals.length > 0,
      activeModals,
    }),
    [activeModals],
  )

  const methods = React.useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
    }),
    [openModal, closeModal, closeAllModals],
  )

  return (
    <ModalContext.Provider value={state}>
      <ModalControlContext.Provider value={methods}>
        {children}
      </ModalControlContext.Provider>
    </ModalContext.Provider>
  )
}

export function useModals() {
  return React.useContext(ModalContext)
}
export function useModalControls() {
  return React.useContext(ModalControlContext)
}
