export const invoiceStatusType = [
  'Paid',
  'Unpaid',
  'Partially',
  'Void',
  'Uncollectible',
  'Draft',
  'Open',
] as const

export type OrderLineService = {
  id?: number
  service_id?: number
  name: string
  price: number
  quantity: number
  store_id: string
  created_at?: string
  repair_order_id: string
}

export type OrderLinePart = {
  id?: number
  part_id: number
  part_no: string
  name: string
  price: number
  quantity: number
  store_id: string
  repair_order_id: string
  service_id?: string
}
