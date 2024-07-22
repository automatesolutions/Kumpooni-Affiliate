import React, { useCallback } from 'react'
import { Keyboard, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Button } from '#/components/Button'
import { useDialogControl } from '#/components/Dialog'
import { useTheme, atoms as a } from '#/theme'
import { Text } from '#/components/Typography'

import { Services } from '#/modules/shared/types'
import { ServicesSelectDialog } from '../dialogs/ServicesSelect'

export function SelectServiceBtn({
  onClose,
  onSelect,
  value = 'Select Services',
  invalid,
  disabled = false,
  style,
  textStyle,
}: {
  onClose: () => void
  disabled?: boolean
  value?: string
  onSelect: (value: Services) => void
  invalid?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}) {
  const control = useDialogControl()
  const t = useTheme()
  const onPress = useCallback(() => {
    Keyboard.dismiss()
    control.open()
  }, [control])
  return (
    <>
      <Button
        onPress={onPress}
        label="Select Category"
        shape="round"
        disabled={disabled}
        style={[
          a.rounded_sm,
          a.justify_start,
          a.align_center,
          a.px_xs,
          a.flex_row,
          a.justify_between,
          { paddingTop: 14, paddingBottom: 14 },
          {
            borderWidth: 2,
            backgroundColor: invalid
              ? t.palette.negative_25
              : t.palette.contrast_25,
            borderColor: invalid
              ? t.palette.negative_300
              : t.palette.contrast_25,
          },
          style,
        ]}
        variant="solid">
        <Text style={[a.text_lg, textStyle]}>{value}</Text>
        {/* <ChevronRight size={20} color={t.palette.contrast_500} /> */}
      </Button>
      <ServicesSelectDialog
        control={control}
        onClose={onClose}
        onSelect={onSelect}
      />
    </>
  )
}
