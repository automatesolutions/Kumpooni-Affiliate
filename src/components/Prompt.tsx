import React from 'react'
import { View } from 'react-native'

import { atoms as a, useBreakpoints, useTheme } from '#/theme'
import { Button, ButtonColor, ButtonText } from '#/components/Button'
import * as Dialog from '#/components/Dialog'
import { Text } from '#/components/Typography'

export { useDialogControl as usePromptControl } from '#/components/Dialog'

const Context = React.createContext<{
  titleId: string
  descriptionId: string
}>({
  titleId: '',
  descriptionId: '',
})

export function Outer({
  children,
  control,
  testID,
}: React.PropsWithChildren<{
  control: Dialog.DialogOuterProps['control']
  testID?: string
}>) {
  const { gtMobile } = useBreakpoints()
  const titleId = React.useId()
  const descriptionId = React.useId()

  const context = React.useMemo(
    () => ({ titleId, descriptionId }),
    [titleId, descriptionId],
  )

  return (
    <Dialog.Outer control={control} testID={testID}>
      <Context.Provider value={context}>
        <Dialog.Handle />

        <Dialog.ScrollableInner
          accessibilityLabelledBy={titleId}
          accessibilityDescribedBy={descriptionId}
          contentContainerStyle={[a.justify_center, a.align_center]}
          style={[
            gtMobile
              ? a.w_full
              : {
                  width: 'auto',
                  maxWidth: 800,
                  minWidth: 600,
                },
          ]}>
          {children}
        </Dialog.ScrollableInner>
      </Context.Provider>
    </Dialog.Outer>
  )
}

export function TitleText({ children }: React.PropsWithChildren<{}>) {
  const { titleId } = React.useContext(Context)
  return (
    <Text nativeID={titleId} style={[a.text_2xl, a.font_bold, a.pb_sm]}>
      {children}
    </Text>
  )
}

export function DescriptionText({
  children,
  selectable,
}: React.PropsWithChildren<{ selectable?: boolean }>) {
  const t = useTheme()
  const { descriptionId } = React.useContext(Context)
  return (
    <Text
      nativeID={descriptionId}
      selectable={selectable}
      style={[a.text_md, a.leading_snug, t.atoms.text_contrast_high, a.pb_lg]}>
      {children}
    </Text>
  )
}

export function Actions({ children }: React.PropsWithChildren<{}>) {
  const { gtMobile } = useBreakpoints()

  return (
    <View
      style={[
        a.gap_md,
        a.justify_end,
        gtMobile
          ? [
              a.flex_col,
              {
                width: 'auto',
                maxWidth: 800,
                minWidth: 600,
              },
            ]
          : [a.flex_row, a.flex_row_reverse, a.justify_start],
      ]}>
      {children}
    </View>
  )
}

export function Cancel({
  cta,
}: {
  /**
   * Optional i18n string. If undefined, it will default to "Cancel".
   */
  cta?: string
}) {
  const { gtMobile } = useBreakpoints()
  const { close } = Dialog.useDialogContext()
  const onPress = React.useCallback(() => {
    close()
  }, [close])

  return (
    <Button
      variant="solid"
      color="secondary"
      size={gtMobile ? 'small' : 'medium'}
      label={cta || `Cancel`}
      onPress={onPress}>
      <ButtonText style={[a.text_lg]}>{cta || `Cancel`}</ButtonText>
    </Button>
  )
}

export function Action({
  onPress,
  color = 'primary',
  cta,
  testID,
}: {
  /**
   * Callback to run when the action is pressed. The method is called _after_
   * the dialog closes.
   *
   * Note: The dialog will close automatically when the action is pressed, you
   * should NOT close the dialog as a side effect of this method.
   */
  onPress: () => void
  color?: ButtonColor
  /**
   * Optional i18n string. If undefined, it will default to "Confirm".
   */
  cta?: string
  testID?: string
}) {
  const { gtMobile } = useBreakpoints()
  const { close } = Dialog.useDialogContext()
  const handleOnPress = React.useCallback(() => {
    close(onPress)
  }, [close, onPress])

  return (
    <Button
      variant="solid"
      color={color}
      size={gtMobile ? 'small' : 'medium'}
      label={cta || `Confirm`}
      onPress={handleOnPress}
      testID={testID}>
      <ButtonText style={[a.text_lg]}>{cta || `Confirm`}</ButtonText>
    </Button>
  )
}

export function Basic({
  control,
  title,
  description,
  cancelButtonCta,
  confirmButtonCta,
  onConfirm,
  confirmButtonColor,
  showCancel = true,
}: React.PropsWithChildren<{
  control: Dialog.DialogOuterProps['control']
  title: string
  description: string
  cancelButtonCta?: string
  confirmButtonCta?: string
  /**
   * Callback to run when the Confirm button is pressed. The method is called
   * _after_ the dialog closes.
   *
   * Note: The dialog will close automatically when the action is pressed, you
   * should NOT close the dialog as a side effect of this method.
   */
  onConfirm: () => void
  confirmButtonColor?: ButtonColor
  showCancel?: boolean
}>) {
  return (
    <Outer control={control} testID="confirmModal">
      <TitleText>{title}</TitleText>
      <DescriptionText>{description}</DescriptionText>
      <Actions>
        <Action
          cta={confirmButtonCta}
          onPress={onConfirm}
          color={confirmButtonColor}
          testID="confirmBtn"
        />
        {showCancel && <Cancel cta={cancelButtonCta} />}
      </Actions>
    </Outer>
  )
}
