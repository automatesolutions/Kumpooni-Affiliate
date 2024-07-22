import { Database } from '#/database'
import { Filter } from '#/utils/query'
import { ServiceSchema } from './services.model'
import { getService, getServices } from './services.service'

export type ServiceStatusType =
  | 'All'
  | 'Active'
  | 'Inactive'
  | 'Draft'
  | 'Deleted'

export const serviceStatus = [
  'Active',
  'Inactive',
  'Draft',
  'Deleted',
  'Reviewed',
] as const

export type ServiceStatus = Database['public']['Enums']['serviceStatus']

export type StatusFilter = {
  column: string
  operator: string
  value: ServiceStatusType
}
export type SearchParams = {
  limit: number
  offset: number
  filters: StatusFilter[]
}
export type Service = NonNullable<
  Awaited<ReturnType<typeof getService>>
>['data']

export type Services = NonNullable<
  Awaited<ReturnType<typeof getServices>>['data']
>[number]
