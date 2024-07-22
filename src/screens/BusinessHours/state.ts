import { logger } from '#/logger'
import React from 'react'

export const WEEKDAY_DISPLAY_NAME: {
  [key: number]: string
} = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}
export type ScheduleState = {
  selectedWeekDay: {
    [key: number]: {
      id: number
      openingTime: string | null
      closingTime: string | null
    }
  }
}
export type ScheduleAction = {
  key: number
  type: 'setSelectedWeekDayTime'
  openingTime: string
  closingTime: string
  id: number
}

export const initialState: ScheduleState = {
  selectedWeekDay: {},
}
export const Context = React.createContext<{
  state: ScheduleState
  dispatch: React.Dispatch<ScheduleAction>
  weekDay: { [key: number]: string }
}>({
  state: { ...initialState },
  dispatch: () => {},
  weekDay: WEEKDAY_DISPLAY_NAME,
})

export function reducer(s: ScheduleState, a: ScheduleAction): ScheduleState {
  console.log('reducer', s)
  let next = { ...s }
  switch (a.type) {
    case 'setSelectedWeekDayTime': {
      next.selectedWeekDay[a.key] = {
        id: a.id,
        openingTime: a.openingTime,
        closingTime: a.closingTime,
      }
      break
    }
  }
  const state = {
    ...next,
  }
  logger.debug(`schedule`, {
    selectedWeekDay: state.selectedWeekDay,
  })
  return state
}
