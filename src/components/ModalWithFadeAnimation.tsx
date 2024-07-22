import type { FC } from 'react'
import type { ModalProps } from 'react-native-modal'
import _Modal from 'react-native-modal'

export const ModalWithFadeAnimation: FC<
  Partial<ModalProps> & Required<Pick<ModalProps, 'isVisible'>>
> = props => {
  return (
    //@ts-ignore
    <_Modal
      //@ts-ignore
      animationIn={'fadeIn'} //@ts-ignore
      animationOut={'fadeOut'} //@ts-ignore
      animationInTiming={250} //@ts-ignore
      animationOutTiming={250} //@ts-ignore
      backdropTransitionOutTiming={0} //@ts-ignore
      {...(props as ModalProps)}
    />
  )
}
