import React from 'react'

import { useTheme } from '#/theme'
import { DateFieldProps } from '#/components/forms/DateField/types'

import * as TextField from '#/components/forms/TextField'
import { DateFieldButton } from './index.shared'
import { toSimpleDateString } from './utils'
import { Calendar } from 'react-native-calendars'

export const LabelText = TextField.LabelText

export function DateRangedField({
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
        <Calendar
          modal
          open
          timeZoneOffsetInMinutes={0}
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
