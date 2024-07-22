import { color } from '#/theme/tokens'
import React, { useState, useMemo, useCallback } from 'react'
import { StyleSheet, Text, View, TextStyle } from 'react-native'
import {
  CalendarList as _CalendarList,
  CalendarProps,
  DateData,
} from 'react-native-calendars'
import XDate from 'xdate'

const RANGE = 6
const initialDate = '2024-06-06'
const nextWeekDate = '2024-07-14'
const nextMonthDate = '2024-08-05'

interface Props extends CalendarProps {
  horizontalView?: boolean
}
function initialEndMonth() {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 5)

  return currentDate.toISOString()
}
export function CalendarList(props: Props) {
  const { horizontalView } = props
  const [startMonth] = useState(new Date().toISOString())
  const [endMonth] = useState(initialEndMonth)
  const [state, setState] = useState({
    fromDate: '',
    toDate: '',
    dateError: '',
  })
  const [calendar, setCalendar] = useState({
    isFromDatePicked: false,
    isToDatePicked: false,
    markedDates: {},
    fromDate: '',
  })
  const [selected, setSelected] = useState(initialDate)
  const marked = useMemo(() => {
    return {
      [nextWeekDate]: {
        selected: selected === nextWeekDate,
        selectedTextColor: '#5E60CE',
        marked: true,
      },
      [nextMonthDate]: {
        selected: selected === nextMonthDate,
        selectedTextColor: '#5E60CE',
        marked: true,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#5E60CE',
        selectedTextColor: 'white',
      },
    }
  }, [selected])
  const setupStartMarker = (day: any) => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        customeStyles: {
          container: calendarStyles.startDateStyle,
          text: calendarStyles.textStyle,
        },
      },
    }
    setCalendar({
      ...calendar,
      isFromDatePicked: true,
      fromDate: day.dateString,
      markedDates: markedDates,
    })
  }
  const setupMarkedDates = (
    fromDate: string,
    toDate: any,
    markedDates: any,
  ) => {
    try {
      let mFromDate = new XDate(fromDate)
      let mToDate = new XDate(toDate)
    } catch (error) {
      console.error('error in new XDATE', error)
    }

    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    if (range >= 0) {
      if (range == 0) {
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if (i < range) {
            markedDates[tempDate] = {
              customStyles: {
                container: calendarStyles.middleDateStyle,
                text: calendarStyles.textStyle,
              },
            }
          } else {
            markedDates[tempDate] = {
              customStyles: {
                container: calendarStyles.endDateStyle,
                text: calendarStyles.textStyle,
              },
            }
          }
        }
      }
    }
    return [markedDates, range]
  }
  const onDayPress = (day: any) => {
    console.log('onDayPress', day)
    if (
      !calendar.isFromDatePicked ||
      (calendar.isFromDatePicked && calendar.isToDatePicked)
    ) {
      console.log('settingStartmarker', day)
      setupStartMarker(day)
    } else if (!calendar.isToDatePicked) {
      console.log('settingEndmarker', day)
      let markedDates = { ...calendar.markedDates }
      let [mMarkedDates, range] = setupMarkedDates(
        state.fromDate,
        day.dayString,
        markedDates,
      )
      if (range >= 0) {
        setCalendar({
          ...state,
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates,
        })
      } else {
        setupStartMarker(day)
      }
    }
  }

  return (
    <_CalendarList
      stickyHeaderIndices={[0]}
      current={initialDate}
      pastScrollRange={0}
      futureScrollRange={6}
      onDayPress={onDayPress}
      markedDates={marked}
      markingType={'custom'}
      minDate={props.minDate}
      renderHeader={!horizontalView ? renderCustomHeader : undefined}
      calendarHeight={!horizontalView ? 390 : undefined}
      theme={!horizontalView ? theme : undefined}
      horizontal={horizontalView}
      pagingEnabled={horizontalView}
      staticHeader={horizontalView}
    />
  )
}

const theme = {
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#48BFE3',
        },
      },
    },
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8,
    },
    todayText: {
      color: '#5390D9',
      fontWeight: '800',
    },
  },
}

const calendarStyles = StyleSheet.create({
  startDateStyle: {
    backgroundColor: 'red',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
  },
  endDateStyle: {
    backgroundColor: 'red',
    width: '100%',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
  },
  middleDateStyle: {
    backgroundColor: color.red_25,
    width: '100%',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: color.gray_25,
    paddingHorizontal: 16,
  },
  month: {},
  year: {},
})
