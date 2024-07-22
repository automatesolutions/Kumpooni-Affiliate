import * as z from 'zod'

export const partsValidator = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  part_no: z.string().nullable(),
  price: z.coerce.number(),
  description: z.string().nullable(),
  store_id: z.string().nullable(),
  brand: z.string().nullable(),
  category_id: z.number().nullable(),
})
