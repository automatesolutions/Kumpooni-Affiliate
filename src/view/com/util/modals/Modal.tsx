import React, { useEffect, useRef, useCallback, Fragment } from 'react'
import { Keyboard, StyleSheet } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheet from '@discord/bottom-sheet/src'
import { createCustomBackdrop } from './BottoSheetCustomBackdrop'
import { useModalControls, useModals } from '#/state/modals'
import * as CreateOrEditPart from './CreateOrEditPart'
import * as StoreProfile from './StoreProfile'
import * as BusinessInformation from './BusinessInformation'

import * as ChangeEmail from './ChangeEmail'
import * as VerifyEmailModal from './VerifyEmail'
import * as ChangePasswordModal from './ChangePassword'

const DEFAULT_SNAPPOINTS = ['100%']
const HANDLE_HEIGHT = 24

export function ModalsContainer() {
  const { isModalActive, activeModals } = useModals()
  const { closeModal } = useModalControls()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const safeAreaInsets = useSafeAreaInsets()

  const activeModal = activeModals[activeModals.length - 1]

  const onBottomSheetChange = useCallback(
    async (snapPoint: number) => {
      if (snapPoint === -1) {
        closeModal()
      }
    },
    [closeModal],
  )

  const onClose = () => {
    Keyboard.dismiss()
    closeModal()
  }

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name])

  let needsSafeTopInset = false
  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS
  let element

  if (activeModal?.name === 'create-or-edit-part') {
    snapPoints = CreateOrEditPart.snapPoints
    element = <CreateOrEditPart.Component {...activeModal} />
  } else if (activeModal?.name === 'store-profile') {
    snapPoints = StoreProfile.snapPoints
    element = <StoreProfile.Component {...activeModal} />
  } else if (activeModal?.name === 'change-email') {
    snapPoints = ChangeEmail.snapPoints
    element = <ChangeEmail.Component {...activeModal} />
  } else if (activeModal?.name === 'verify-email') {
    snapPoints = VerifyEmailModal.snapPoints
    element = <VerifyEmailModal.Component {...activeModal} />
  } else if (activeModal?.name === 'change-password') {
    snapPoints = ChangePasswordModal.snapPoints
    element = <ChangePasswordModal.Component />
  }
  if (snapPoints[0] === 'fullscreen') {
    console.log('fullScreen')
    return (
      <SafeAreaView
        style={[styles.fullscreenContainer, { backgroundColor: '#fff' }]}>
        {element}
      </SafeAreaView>
    )
  }
  const topInset = needsSafeTopInset ? safeAreaInsets.top - HANDLE_HEIGHT : 0

  return (
    <Fragment>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        topInset={topInset}
        handleHeight={HANDLE_HEIGHT}
        index={isModalActive ? 0 : -1}
        enablePanDownToClose
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        backdropComponent={
          isModalActive ? createCustomBackdrop(onClose) : undefined
        }
        handleIndicatorStyle={{ height: 0 }}
        handleStyle={[styles.handle]}
        onChange={onBottomSheetChange}>
        {element}
      </BottomSheet>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
