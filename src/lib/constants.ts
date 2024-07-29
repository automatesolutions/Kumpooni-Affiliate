import {ServiceStatusType} from '#/modules/services/types'
import {Insets} from 'react-native'

export type PeriodTypes = 'today' | 'yesterday' | 'this_week' | 'this_month'
export type OrderStatusTabType =
  | 'inprogress'
  | 'scheduled'
  | 'canceled'
  | 'completed'
  | 'awaiting_parts'
  | 'All Orders'
export type OrderStatusType =
  | 'inprogress'
  | 'scheduled'
  | 'new-order'
  | 'completed'
  | 'awaiting-parts'
  | 'canceled'

export const periods: Array<{
  value: PeriodTypes
  label: string
}> = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'yesterday',
    label: 'Yesterday',
  },
  {
    value: 'this_week',
    label: 'This week',
  },
  {
    value: 'this_month',
    label: 'This month',
  },
]

export const orderStatusTabs: Array<{
  key: OrderStatusTabType
  label: string
}> = [
  {
    key: 'All Orders',
    label: 'All Orders',
  },
  {
    key: 'scheduled',
    label: 'Scheduled',
  },
  {
    key: 'inprogress',
    label: 'In Progress',
  },
  {
    key: 'completed',
    label: 'Completed',
  },
  {
    key: 'canceled',
    label: 'Canceled',
  },
]

export const createHitslop = (size: number): Insets => ({
  top: size,
  left: size,
  bottom: size,
  right: size,
})
export const HITSLOP_10 = createHitslop(10)
export const HITSLOP_20 = createHitslop(20)
export const HITSLOP_30 = createHitslop(30)
export type DummyData = {
  id: number
  name: string
}
export const dummyData = [
  {
    id: 1,
    name: 'Ryan',
  },
  {
    id: 2,
    name: 'Baldwin',
  },
  ,
  {
    id: 3,
    name: 'HollowBlocks',
  },
]

export const services = [
  {
    title: 'PMS Package 1',
    value: '1',
  },
  {
    title: 'PMS Package 2',
    value: '2',
  },
  {
    title: 'PMS Package 3',
    value: '3',
  },
  {
    title: 'Change Oil',
    value: '4',
  },
  {
    title: 'Car Wash',
    value: '5',
  },
  {
    title: 'Aircon',
    value: '6',
  },
  {
    title: 'AWit kabayo',
    value: '7',
  },
]

export const emojisWithIcons = [
  {title: 'happy', icon: 'emoticon-happy-outline'},
  {title: 'cool', icon: 'emoticon-cool-outline'},
  {title: 'lol', icon: 'emoticon-lol-outline'},
  {title: 'sad', icon: 'emoticon-sad-outline'},
  {title: 'cry', icon: 'emoticon-cry-outline'},
  {title: 'angry', icon: 'emoticon-angry-outline'},
  {title: 'confused', icon: 'emoticon-confused-outline'},
  {title: 'excited', icon: 'emoticon-excited-outline'},
  {title: 'kiss', icon: 'emoticon-kiss-outline'},
  {title: 'devil', icon: 'emoticon-devil-outline'},
  {title: 'dead', icon: 'emoticon-dead-outline'},
  {title: 'wink', icon: 'emoticon-wink-outline'},
  {title: 'sick', icon: 'emoticon-sick-outline'},
  {title: 'frown', icon: 'emoticon-frown-outline'},
]

export const orderStatus: Array<{
  value: OrderStatusType
  label: string
}> = [
  {
    value: 'scheduled',
    label: 'Scheduled',
  },
  {
    value: 'inprogress',
    label: 'In Progress',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'canceled',
    label: 'Canceled',
  },
  {
    value: 'awaiting-parts',
    label: 'Awaiting Parts',
  },
]

export const statusFilterTab: Array<{
  value: ServiceStatusType
  label: string
}> = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Inactive',
    label: 'Inactive',
  },
  {
    value: 'Draft',
    label: 'Draft',
  },
]

export type NotificationCategory =
  | 'Important'
  | 'Order'
  | 'Services'
  | 'Store'
  | 'Updates'

export const notificationTabCategory: Array<{
  value: number
  label: NotificationCategory
}> = [
  {
    value: 1,
    label: 'Important',
  },
  {
    value: 2,
    label: 'Order',
  },
  {
    value: 3,
    label: 'Services',
  },
  {
    value: 4,
    label: 'Store',
  },
  {
    value: 5,
    label: 'Updates',
  },
] as const

export type SettingsTabType = 'Store Information' | 'Business Information'

export const settingsTab: Array<{
  value: SettingsTabType
  label: string
}> = [
  {value: 'Store Information', label: 'Store Information'},
  {value: 'Business Information', label: 'Business Information'},
]
export const serviceStatusType = ['Active', 'Inactive']
