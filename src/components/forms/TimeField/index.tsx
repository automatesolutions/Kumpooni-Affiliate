import React from 'react'
import DatePicker from 'react-native-date-picker'

import { useTheme } from '#/theme'
import { DateFieldProps } from '#/components/forms/DateField/types'

import * as TextField from '#/components/forms/TextField'

import { toSimpleDateString } from './utils'
import { DateFieldButton, TimeFieldButton } from './index.shared'
import { getTimeDate } from '#/lib/utils'

export * as utils from '#/components/forms/TimeField/utils'
export const LabelText = TextField.LabelText

export function TimeField({
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
    (time: Date) => {
      setOpen(false)

      const formatted = toSimpleDateString(time)
      console.log('Formatedd', formatted)
      onChangeDate(time.toString())
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
      <TimeFieldButton
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
          minuteInterval={10}
          timeZoneOffsetInMinutes={0}
          theme={t.name === 'light' ? 'light' : 'dark'}
          date={new Date(getTimeDate(value ?? '00:00:00'))}
          onConfirm={onChangeInternal}
          onCancel={onCancel}
          mode="time"
          testID={`${testID}-datepicker`}
          aria-label={label}
          accessibilityLabel={label}
          accessibilityHint={accessibilityHint}
        />
      )}
    </>
  )
}
