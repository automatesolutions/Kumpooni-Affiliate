import React, { useCallback, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import * as Dialog from '#/components/Dialog'
import { HStack } from '../HStack'
import { Required } from '../Required'
import { Calendar, CalendarUtils } from 'react-native-calendars'
import { DateRangedField } from '../forms/DateRangedField'
import { X } from 'lucide-react-native'
import { CalendarList } from '../CalendarList'
import { DateRangedPicker } from '../forms/DateRangePicker'
type HolidayProps = {}

export function HolidayDialog({
  control,
  onConfirm,
  onClose,
}: {
  control: Dialog.DialogControlProps
  onConfirm: (dates: string[]) => void
  onClose: () => void
}) {
  const t = useTheme()
  return (
    <Dialog.Outer
      onClose={onClose}
      control={control}
      nativeOptions={{
        sheet: {
          snapPoints: ['80%'],
        },
      }}>
      <Dialog.Close />
      <Dialog.Inner label="Date Selection">
        <HolidayInner control={control} onConfirm={onConfirm} />
      </Dialog.Inner>
    </Dialog.Outer>
  )
}

function HolidayInner({
  control,
  onConfirm,
}: {
  control: Dialog.DialogControlProps
  onConfirm: (dates: string[]) => void
}) {
  const t = useTheme()

  return (
    <View
      style={[
        t.atoms.bg,
        a.h_full,
        a.w_full,
        {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
      ]}>
      <HStack style={[a.justify_between, a.px_xl]}>
        <View />
        <Text style={[a.align_center, a.text_center, a.text_2xl, a.font_bold]}>
          Date Selection
        </Text>
        <TouchableOpacity>
          <X size={24} color={'#000'} />
        </TouchableOpacity>
      </HStack>
      <DateRangedPicker horizontalView onConfirm={onConfirm} />
    </View>
  )
}

const styles = StyleSheet.create({})
