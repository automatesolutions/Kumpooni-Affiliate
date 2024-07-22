import { Enums } from '#/database'
import { OrderLinePart, OrderLineService } from '../orders'

import { getRepairOrders, getRepairPayments } from './repairs.service'

export type RepairOrderBase = NonNullable<
  Awaited<ReturnType<typeof getRepairOrders>>['data']
>[number]

export interface RepairOrder
  extends Omit<RepairOrderBase, 'order_line_services' | 'order_line_parts'> {
  order_line_services: OrderLineService[]
  order_line_parts: OrderLinePart[]
}
export type RepairStatus = Enums<'repair_order_status'>

export type Payment = NonNullable<
  Awaited<ReturnType<typeof getRepairPayments>>['data']
>[number]
