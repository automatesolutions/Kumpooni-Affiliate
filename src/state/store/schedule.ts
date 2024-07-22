import { ServiceLinePartSchema as Part } from '#/modules/parts/parts.model'

import { create } from 'zustand'

type UpdateSchedule = {
  open_time: string
  close_time: string
}
type Schedule = {
  id: number
  open_time: string | null
  close_time: string | null
  store_id: string
  day_of_week: number
}
interface ScheduleZustand {
  schedules: Schedule[]
  addSchedule: (schedule: Schedule) => void
  editSchedule: (id: number, schedule: Schedule) => void
  setSchedule: (id: number, schedule: Schedule) => void
}
export const useSchedule = create<ScheduleZustand>((set, get) => ({
  schedules: [],
  addSchedule: newSched => {
    set({ schedules: [...get().schedules, newSched] })
  },
  editSchedule: (id: number, newSched) => {
    const updatedSchedule = get().schedules.map(schedule =>
      schedule.id === id ? { ...schedule, ...newSched } : newSched,
    )
    return set({ schedules: updatedSchedule })
  },
  setSchedule: (id, newSched) => {
    const foundIndex =
      typeof get().schedules.find(sched => sched.id === id) !== 'undefined'
    console.log('foundIndex', foundIndex)
    if (foundIndex) {
      const updatedSchedule = get().schedules.map(schedule =>
        schedule.id === id ? { ...schedule, ...newSched } : newSched,
      )
      return set({ schedules: updatedSchedule })
    }

    return set({ schedules: [...get().schedules, newSched] })
  },
}))

// setParts: (parts: Part[]) => {
//     set({ parts: parts })
//   },
//   addPart: (part: Part) => {
//     set({ parts: [...get().parts, part] })
//   },
//   editPart: (id: number, part: Part) => {
//     const updatedParts = get().parts.map(p =>
//       p.id === id ? { ...p, ...part } : p,
//     )
//     return set({ parts: updatedParts })
//   },
//   removePart: (id: number) => {
//     set({ parts: [...get().parts.filter(part => part.id !== id)] })
//   },
//   clearParts: () => {
//     set({ parts: [] })
//   },
