import {OrderStatusType} from '#/lib/constants'
import {Enums} from '#/types/supabase'
import {OrderLinePart, OrderLineService} from '../orders'

import {getRepairOrders, getRepairPayments} from './repairs.service'

export type RepairOrderBase = NonNullable<
  Awaited<ReturnType<typeof getRepairOrders>>['data']
>[number]

export interface RepairOrder
  extends Omit<
    RepairOrderBase,
    'order_line_services' | 'order_line_parts' | 'status'
  > {
  status: OrderStatusType
  order_line_services: OrderLineService[]
  order_line_parts: OrderLinePart[]
}
export type RepairStatus = Enums<'notification_type'>

export type Payment = NonNullable<
  Awaited<ReturnType<typeof getRepairPayments>>['data']
>[number]
