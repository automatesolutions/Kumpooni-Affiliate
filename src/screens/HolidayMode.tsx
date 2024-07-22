import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Keyboard, ActivityIndicator } from 'react-native'
import { Text } from '#/components/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTheme, atoms as a } from '#/theme'
import { CommonNavigatorParams } from '#/lib/routes/types'
import { Button } from '#/components/Button'
import { HolidayDialog } from '#/components/dialogs/Holiday'
import { useDialogControl } from '#/components/Dialog'
import * as Toggle from '#/components/forms/Toggle'
import { Separator } from '#/view/com/util/Views'
import { color } from '#/theme/tokens'
import { HStack } from '#/components/HStack'
import { useSession } from '#/state/session'
import {
  Holiday,
  useHolidayMutation,
  useHolidayQuery,
} from '#/state/queries/holiday'
import { logger } from '#/logger'
import { useGlobalLoadingControls } from '#/state/shell/global-loading'
import { ErrorMessage } from '#/view/com/util/error/ErrorMessage'
type Props = NativeStackScreenProps<CommonNavigatorParams, 'HolidayMode'>

export function HolidayModeScreen(props: Props) {
  const t = useTheme()
  const { session } = useSession()
  const {
    data: holiday,
    isLoading,
    isError,
  } = useHolidayQuery(session?.store_id)
  if (isLoading) {
    return (
      <View style={[a.flex_1, a.justify_center, a.align_center]}>
        <ActivityIndicator size={'large'} color={'#000'} />
      </View>
    )
  }
  if (isError) {
    return (
      <View>
        <ErrorMessage message="Failed to fetch holidays" />
      </View>
    )
  }
  return (
    <View style={[a.flex_1, t.atoms.bg_contrast_25]}>
      <View style={[a.px_2xl, a.py_sm, a.rounded_sm, t.atoms.bg, a.m_lg]}>
        <Text style={[a.text_lg, a.font_bold]}>Store Holiday Mode</Text>
        <Text>
          Turn on holiday mode to temporarily deactivate your istings. Make sure
          you have fulfilled all pending orders before youl leave.
        </Text>

        <SelectHolidayBtn name={'Core Automotive'} holidays={holiday ?? []} />
      </View>
    </View>
  )
}

function SelectHolidayBtn({
  name,
  holidays,
}: {
  name: string
  holidays: Holiday[]
}) {
  const t = useTheme()
  const control = useDialogControl()
  const [currentDate] = useState(() => {
    return new Date().toISOString().split('T')[0]
  })
  const [open, setOpen] = useState(false)
  const [listDate, setListDate] = useState<string[]>(() => {
    if (holidays.length > 0) {
      const startDate = new Date(holidays[0].start_date)
      const endDate = new Date(holidays[0].end_date)
      const dateArray: string[] = []
      let currentDate = startDate

      while (currentDate <= endDate) {
        dateArray.push(currentDate.toISOString().split('T')[0]) // Formatting as YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return dateArray
    }
    return []
  })

  const onHoliday = listDate[0] <= currentDate
  const onPressSelectHoliday = useCallback(() => {
    setOpen(true)
    Keyboard.dismiss()
    control.open()
  }, [control])
  const { session } = useSession()
  const holidayMutation = useHolidayMutation(session?.store_id)
  const globalLoading = useGlobalLoadingControls()
  const onPressConfirm = useCallback(
    async (dates: string[]) => {
      if (dates.length > 0) {
        globalLoading.show()
        try {
          await holidayMutation.mutateAsync(dates, {})
        } catch (error) {
          logger.error('Error', { error })
        }
        globalLoading.hide()
      }

      setListDate(dates)
      control.close()
    },
    [setListDate, control],
  )

  const onClose = useCallback(() => {
    if (listDate.length > 0) {
      return
    }
    setOpen(false)
    control.close()
  }, [setOpen, listDate, control])
  return (
    <>
      <View
        style={[
          a.mt_2xl,
          a.gap_sm,
          a.p_md,
          a.rounded_xs,
          t.atoms.bg_contrast_25,
        ]}>
        <View style={[a.flex_row, a.justify_between]}>
          <Text style={[a.font_bold, a.text_lg]}>{name}</Text>

          <Toggle.Item
            name="Open"
            label="SetOpen"
            value={onHoliday ? true : open}
            onChange={onPressSelectHoliday}>
            <Toggle.Switch />
          </Toggle.Item>
        </View>

        {listDate.length > 0 ? (
          <>
            {onHoliday ? (
              <Text
                style={[
                  a.text_md,
                  a.font_semibold,
                  a.self_start,
                  a.rounded_xs,
                  {
                    color: color.blue_500,
                    backgroundColor: color.blue_25,
                    marginTop: -4,
                  },
                ]}>
                On Holiday
              </Text>
            ) : (
              <Text
                style={[
                  a.text_md,
                  a.font_semibold,
                  a.self_start,
                  a.rounded_xs,
                  {
                    color: '#ff7d00',
                    backgroundColor: '#fff7e8',
                    marginTop: -4,
                  },
                ]}>
                Waiting to be activated
              </Text>
            )}
            <Separator />
            <HStack>
              <Text style={[a.font_semibold, a.text_md, { marginRight: 50 }]}>
                Date range
              </Text>

              <Text style={[a.text_md, { fontWeight: '400' }]}>{`${
                listDate[0] ?? ''
              } - ${listDate[listDate.length - 1] ?? listDate[0]}`}</Text>
            </HStack>
          </>
        ) : null}
      </View>
      <HolidayDialog
        control={control}
        onConfirm={onPressConfirm}
        onClose={onClose}
      />
    </>
  )
}
const styles = StyleSheet.create({})
