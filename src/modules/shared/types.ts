import { getInternalServices, getParts } from './shared.service'

export type Services = NonNullable<
  Awaited<ReturnType<typeof getInternalServices>>['data']
>[number]

export type Parts = NonNullable<
  Awaited<ReturnType<typeof getParts>>['data']
>[number]
