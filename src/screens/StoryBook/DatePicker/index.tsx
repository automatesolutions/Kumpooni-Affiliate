import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import _DatePicker from 'react-native-date-picker'
import { HStack } from '#/components/HStack'
import { CalendarList } from 'react-native-calendars'

type indexProps = {}

function initialMaxDateSelection() {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 5)

  return currentDate.toISOString()
}
export function DatePicker(props: indexProps) {
  const t = useTheme()
  const [startDate] = useState(new Date().toISOString())
  const [maxDateSelection] = useState(initialMaxDateSelection)
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(minDate)
  console.log('maxDateSelection', maxDateSelection)
  return (
    <View>
      <CalendarList
        minDate={startDate}
        maxDate={maxDateSelection}
        disableMonthChange={true}
        allowSelectionOutOfRange={true}
        enableSwipeMonths={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
