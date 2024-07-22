import { getAppointments, getStorePerformance } from './appointment.service'

export type Appointment = NonNullable<
  Awaited<ReturnType<typeof getAppointments>>['data']
>[number]

export type StorePerformance = NonNullable<
  Awaited<ReturnType<typeof getStorePerformance>>['data']
>[number]
