import React, { useCallback, useMemo, useState } from 'react'
import { View, StyleSheet, TextStyle, TouchableOpacity } from 'react-native'
import { Text } from '#/components/Typography'
import { useTheme, atoms as a } from '#/theme'
import {
  Calendar,
  CalendarList,
  CalendarProps,
  DateData,
} from 'react-native-calendars'
import { color } from '#/theme/tokens'
import XDate from 'xdate'
import { Button } from '#/components/Button'

import { Theme } from 'react-native-calendars/src/types'

interface DateRangePicker extends CalendarProps {
  horizontalView?: boolean
  onConfirm?: (listDates: string[]) => void
}
function iniitialMinDate() {
  // const date = new Date(INITIAL_DATE)
  // const newDate = date.setDate(date.getDate() + count)
}
export function DateRangedPicker({
  onConfirm,
  horizontalView,
}: DateRangePicker) {
  const t = useTheme()
  const [minDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date.toISOString()
  })

  const [state, setState] = useState({
    isFromDatePicked: false,
    isToDatePicked: false,
    toDate: '',
    fromDate: '',
    markedDates: {},
  })

  const setUpStartMarker = (day: DateData) => {
    let markedDates = {
      [day.dateString]: {
        customStyles: {
          container: styles.startDateStyle,
          text: styles.textStyle,
        },
      },
    }
    setState({
      ...state,
      toDate: day.dateString,
      fromDate: day.dateString,
      isFromDatePicked: true,
      isToDatePicked: false,
      markedDates: markedDates,
    })
  }
  const setupMarkedDates = (
    fromDate: string,
    toDate: string,
    markedDates: any,
  ) => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    if (range >= 0) {
      if (range == 0) {
        console.log('Range is 0')
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if (i < range) {
            markedDates[tempDate] = {
              customStyles: {
                container: styles.middleDateStyle,
                text: styles.textStyle,
              },
            }
          } else {
            markedDates[tempDate] = {
              customStyles: {
                container: styles.endDateStyle,
                text: styles.textStyle,
              },
            }
          }
        }
      }
    }
    return [markedDates, range]
  }

  const onDayPress = (day: DateData) => {
    if (
      !state.isFromDatePicked ||
      (state.isFromDatePicked && state.isToDatePicked)
    ) {
      console.log('settingDayMarker', day)
      setUpStartMarker(day)
    } else if (!state.isToDatePicked) {
      console.log('settingEndmarker', day)
      let markedDates = { ...state.markedDates }
      let [mMarkedDates, range] = setupMarkedDates(
        state.fromDate,
        day.dateString,
        markedDates,
      )
      if (range >= 0) {
        console.log('withinRange', range)
        setState({
          ...state,
          isFromDatePicked: true,
          isToDatePicked: true,
          fromDate: day.dateString,
          markedDates: mMarkedDates,
        })
      } else {
        console.log('noRange', range)
        setUpStartMarker(day)
      }
    }
  }
  const onPressConfirm = useCallback(() => {
    const listDates = Object.keys(state.markedDates)

    onConfirm?.(listDates)
  }, [state, onConfirm])
  return (
    <View style={[a.flex_1]}>
      <Calendar
        stickyHeaderIndices={[0]}
        pastScrollRange={0}
        futureScrollRange={6}
        onDayPress={onDayPress}
        markedDates={state.markedDates}
        markingType={'custom'}
        style={{
          alignSelf: 'center',
          width: '90%',
          marginTop: 10,
        }}
        contentContainerStyle={[
          a.align_center,
          a.justify_center,
          a.p_0,
          a.my_0,
          a.mb_2xl,
        ]}
        minDate={minDate}
        renderHeader={!horizontalView ? renderCustomHeader : undefined}
        // calendarHeight={!horizontalView ? 500 : 500}
        theme={!horizontalView ? theme : theme}
        horizontal={horizontalView}
        pagingEnabled={horizontalView}
        staticHeader={horizontalView}
        showSixWeeks
        hideExtraDays={true}
        // hideDayNames={true}
      />

      <Button
        variant="solid"
        label="Confirm Holiday"
        color="primary"
        size="medium"
        onPress={onPressConfirm}
        style={[{ width: 300 }, a.self_center]}>
        <Text style={[t.atoms.text_inverted, a.font_bold, a.text_lg]}>
          Confirm
        </Text>
      </Button>
    </View>
  )
}

function renderCustomHeader(date: any) {
  const header = date.toString('MM yyyy')
  const [month, year] = header.split(' ')
  const textStyle: TextStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000',
    letterSpacing: 2,
    paddingRight: 5,
  }

  return (
    <View style={styles.header}>
      <Text style={[styles.year, textStyle]}>{`${year}/${month}`}</Text>
    </View>
  )
}
const theme: Theme = {
  // stylesheet: {
  //   calendar: {
  //     header: {
  //       dayHeader: {
  //         fontWeight: '600',
  //         color: '#48BFE3',
  //       },
  //     },
  //   },
  // },
  textDayHeaderFontWeight: 'bold',
  textDayStyle: {
    fontSize: 16,
    color: '#000',
  },
  textDisabledColor: color.gray_300,
  todayTextColor: color.gray_300,
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: color.gray_25,
    paddingHorizontal: 16,
  },
  month: {},
  year: {},
  startDateStyle: {
    backgroundColor: color.blue_500,
    width: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  endDateStyle: {
    backgroundColor: color.blue_500,
    width: '100%',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  middleDateStyle: {
    backgroundColor: color.blue_100,
    width: '100%',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})
