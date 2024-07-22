import { z } from 'zod'

export const orderLineValidator = z.object({
  id: z.number().optional(),
  service_id: z.number().optional(),
  repair_order_id: z.string().optional(),
  name: z.string(),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().min(1),
  store_id: z.string(),
})

export const partLineValidator = z.object({
  id: z.number().optional(),
  part_id: z.number().optional(),
  part_no: z.string(),
  name: z.string().min(3),
  store_id: z.string(),
  repair_order_id: z.string(),
  price: z.coerce.number().gt(0),
  quantity: z.coerce.number().min(1),
})
