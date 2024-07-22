import * as Dialog from '#/components/Dialog'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Text } from '#/components/Typography'
import { atoms as a, useTheme } from '#/theme'
import {
  StoreSchedule,
  useScheduleMutation,
  useScheduleQuery,
} from '#/state/queries/schedule'
import { useSession } from '#/state/session'
import * as Toggle from '#/components/forms/Toggle'
import React, { useCallback, useContext, useState } from 'react'

import { TimeField } from '../forms/TimeField'

import { color } from '#/theme/tokens'

import { Button, ButtonText } from '../Button'

import { useSchedule } from '#/state/store/schedule'
export function BusinessHoursDialog({
  control,
}: {
  control: Dialog.DialogControlProps
}) {
  return (
    <Dialog.Outer
      control={control}
      nativeOptions={{
        sheet: {
          snapPoints: ['90%'],
        },
      }}>
      <Dialog.Handle />
      <Dialog.ScrollableInner label="Business Hours">
        <BusinessHours control={control} />
      </Dialog.ScrollableInner>
    </Dialog.Outer>
  )
}
type WeekDay = {
  [key: number]: {
    id: number
    closingTime: string | null
    openingTime: string | null
  }
}
function BusinessHours({ control }: { control: Dialog.DialogControlProps }) {
  const t = useTheme()
  const { session } = useSession()
  const {
    data: schedule,
    isLoading,
    error,
  } = useScheduleQuery(session?.store_id)
  const onClose = useCallback(() => {
    control.close()
  }, [control])
  return (
    <View style={[a.flex_1, a.px_md, a.py_sm]}>
      <Text style={[a.text_xl, a.font_bold]}>Business Hours</Text>
      {isLoading ? (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      ) : error || !schedule ? (
        <View>
          <Text style={[a.text_lg, a.font_bold]}>Something went wrong! </Text>
          <Text>Please try again</Text>
        </View>
      ) : (
        <BusinessHoursLoaded schedules={schedule} onClose={onClose} />
      )}
    </View>
  )
}

function BusinessHoursLoaded({
  schedules,
  onClose,
}: {
  onClose: () => void
  schedules: StoreSchedule[]
}) {
  const getDayName = useCallback((dayOfWeek: number) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    return days[dayOfWeek]
  }, [])
  const { state, setSchedule } = useSchedule(s => ({
    state: s.schedules,
    setSchedule: s.setSchedule,
  }))
  const { session } = useSession()
  const upsertScheduleMutation = useScheduleMutation(session?.store_id)
  const [dayWeek, setDayWeek] = useState(
    schedules
      .filter(
        schedule => schedule.open_time !== null && schedule.close_time !== null,
      )
      .map(schedule => getDayName(schedule.day_of_week)),
  )
  const onSaveBusinessHours = async () => {
    if (state.length > 0) {
      await upsertScheduleMutation.mutateAsync({ schedules: state })
    }
    onClose()
  }

  const onToggleItem = useCallback(
    (id: number, dayOfWeek: number) => {
      return (value: boolean) => {
        if (value === false) {
          setSchedule(id, {
            id: id,
            open_time: null,
            close_time: null,
            store_id: session?.store_id!,
            day_of_week: dayOfWeek,
          })
          return
        }
        return
      }
    },
    [session, setSchedule],
  )
  return (
    <View style={[a.mt_md]}>
      <Toggle.Group
        onChange={setDayWeek}
        label="Select opening hours"
        values={dayWeek}>
        <View style={[a.gap_md, a.flex_wrap]}>
          {schedules.slice(1).map(schedule => (
            <View style={[a.flex_row, a.gap_md]} key={schedule.id}>
              <Toggle.Item
                onChange={onToggleItem(schedule.id, schedule.day_of_week)}
                name={getDayName(schedule.day_of_week)}
                label={getDayName(schedule.day_of_week)}
                style={[{ width: 200 }]}>
                <Toggle.Switch />
                <Text style={[a.font_bold]}>
                  {getDayName(schedule.day_of_week)}
                </Text>
              </Toggle.Item>
              <WeekDay
                name={getDayName(schedule.day_of_week)}
                schedule={schedule}
              />
            </View>
          ))}
          <View style={[a.flex_row, a.gap_md]} key={schedules[0].id}>
            <Toggle.Item
              name={getDayName(schedules[0].day_of_week)}
              label={getDayName(schedules[0].day_of_week)}
              onChange={onToggleItem(schedules[0].id, schedules[0].day_of_week)}
              style={[{ width: 200 }]}>
              <Toggle.Switch />
              <Text style={[a.font_bold]}>
                {getDayName(schedules[0].day_of_week)}
              </Text>
            </Toggle.Item>
            <WeekDay
              name={getDayName(schedules[0].day_of_week)}
              schedule={schedules[0]}
            />
          </View>
        </View>
      </Toggle.Group>
      <Button
        variant="solid"
        label="Submit"
        color="primary"
        onPress={onSaveBusinessHours}
        style={[
          { width: 200, height: 50 },
          a.justify_center,
          a.rounded_sm,
          a.self_center,
          a.mt_lg,
        ]}>
        <ButtonText style={[a.font_bold, a.text_lg]}>Submit</ButtonText>
      </Button>
    </View>
  )
}

function WeekDay({
  name,
  schedule,
}: {
  name: string
  schedule: StoreSchedule
}) {
  const { values: selectedValues } = Toggle.useGroupContext()
  const [openingTime, setOpeningTime] = useState(schedule.open_time)
  const { setSchedule } = useSchedule(s => ({
    setSchedule: s.setSchedule,
  }))
  const [closingTime, setClosingTime] = useState(schedule.close_time)

  const selected = selectedValues.includes(name)
  const t = useTheme()

  const onSelectOpening = (time: string) => {
    setOpeningTime(time)

    setSchedule(schedule.id, {
      id: schedule.id,
      open_time: time,
      close_time: closingTime,
      store_id: schedule.store_id,
      day_of_week: schedule.day_of_week,
    })
  }

  const onSelectClosing = (time: string) => {
    setClosingTime(time)
    setSchedule(schedule.id, {
      id: schedule.id,
      open_time: openingTime,
      close_time: time,
      store_id: schedule.store_id,
      day_of_week: schedule.day_of_week,
    })
  }

  return (
    <View style={[a.flex_row, a.gap_xl]}>
      {selected ? (
        <>
          <TimeField
            value={openingTime}
            label="From"
            onChangeDate={onSelectOpening}
          />

          <TimeField
            value={closingTime}
            label="To"
            onChangeDate={onSelectClosing}
          />
        </>
      ) : (
        <View
          style={[
            styles.closed,
            a.px_sm,
            a.rounded_sm,
            t.atoms.border_contrast_high,
            a.justify_center,
          ]}>
          <Text style={{ color: color.gray_600 }}>Closed</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  timeField: {
    height: 40,
    width: 250,
    borderWidth: 2,
  },
  closed: {
    height: 50,
    width: 520,

    backgroundColor: color.gray_25,
  },
})
