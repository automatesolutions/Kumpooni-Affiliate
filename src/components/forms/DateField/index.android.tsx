import React from 'react'
import DatePicker from 'react-native-date-picker'

import { useTheme } from '#/theme'
import { DateFieldProps } from '#/components/forms/DateField/types'

import * as TextField from '#/components/forms/TextField'
import { DateFieldButton } from './index.shared'
import { toSimpleDateString } from './utils'

export const LabelText = TextField.LabelText

export function DateField({
  value,
  onChangeDate,
  label,
  isInvalid,
  testID,
  accessibilityHint,
}: DateFieldProps) {
  const t = useTheme()
  const [open, setOpen] = React.useState(false)

  const onChangeInternal = React.useCallback(
    (date: Date) => {
      setOpen(false)

      onChangeDate(date.toISOString())
    },
    [onChangeDate, setOpen],
  )

  const onPress = React.useCallback(() => {
    setOpen(true)
  }, [])

  const onCancel = React.useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <DateFieldButton
        label={label}
        value={value}
        onPress={onPress}
        isInvalid={isInvalid}
        accessibilityHint={accessibilityHint}
      />

      {open && (
        <DatePicker
          modal
          open
          timeZoneOffsetInMinutes={0}
          theme={t.name === 'light' ? 'light' : 'dark'}
          date={new Date(value)}
          onConfirm={onChangeInternal}
          onCancel={onCancel}
          mode="datetime"
          testID={`${testID}-datepicker`}
          aria-label={label}
          accessibilityLabel={label}
          accessibilityHint={accessibilityHint}
        />
      )}
    </>
  )
}
