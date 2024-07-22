import { RepairStatus } from '#/modules/repairs'
import { light, lightPalette } from '#/theme/themes'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)
export const formatDate = (date: Date | string | number) => {
  if (typeof date === 'string' && date.endsWith('Z')) {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export const convertTo12HourFormat = (time: string) => {
  const [hour, minute] = time?.split(':')
  const date = new Date()
  date.setHours(Number(hour))
  date.setMinutes(Number(minute))

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date)

  return formattedTime
}
export const getTimeDate = (time: string) => {
  const [hour, minute] = time?.split(':')
  const date = new Date()
  date.setHours(Number(hour))
  date.setMinutes(Number(minute))

  return date.toISOString()
}

export const setTimeDate = (time: string) => {
  const [hour, minute] = time?.split(':')
  const date = new Date()
  date.setHours(Number(hour))
  date.setMinutes(Number(minute))
  return date
}
export const roundToNearestMinutes = (date: Date, interval: number) => {
  const dateJS = dayjs(date)
  const minutesLeftUntilNextInterval = interval - (dateJS.minute() % interval)
  return dateJS.add(minutesLeftUntilNextInterval, 'minute')

  // Alternatively to ignore seconds (even more precise)
  // return new Date(addMinutes(date, minutesLeftUntilNextInterval).setSeconds(0))
}

export const getOpeningTimes = (startDate: Date, dbDays: any) => {
  const dayOfWeek = startDate.getDay()
}

export function getDisableDates(
  weekDay: number[] | undefined | null,
  maxDate: string,
) {
  if (weekDay == undefined || weekDay == null) return null
  const closedDates2months: string[] = []
  let dayOfWeek = dayjs().day(0)

  while (dayjs(dayOfWeek).isSameOrBefore(maxDate, 'month')) {
    weekDay.map(dow => {
      closedDates2months.push(dayOfWeek.day(dow).format('YYYY-MM-DD'))
    })
    dayOfWeek = dayOfWeek.add(7, 'day')
  }
  return closedDates2months
}

export function getRoundedKm(distance: number | null) {
  if (!distance) return
  const kmDistance = distance / 1000
  return Math.round(kmDistance * 10) / 10
}

export function getStatusColor(status: RepairStatus | null) {
  switch (status) {
    case 'Scheduled':
      return lightPalette.black
    case 'Awaiting Parts':
      return '#facc15'
    case 'Completed':
      return lightPalette.positive_600
    case 'Canceled':
      return lightPalette.negative_500
    case 'In Progress':
      return lightPalette.blue_600
    default:
      return lightPalette.black
  }
}

export function getInvoceStatusColor(status: RepairStatus | null) {
  switch (status) {
    case 'Scheduled':
      return lightPalette.black
    case 'Awaiting Parts':
      return '#facc15'
    case 'Completed':
      return lightPalette.positive_600
    case 'Canceled':
      return lightPalette.negative_500
    case 'In Progress':
      return lightPalette.primary_600
    default:
      return lightPalette.black
  }
}
