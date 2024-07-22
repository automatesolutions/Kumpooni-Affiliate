import * as z from 'zod'
export const partType = ['Part', 'Labor', 'Fee'] as const

export const serviceLinePartValidator = z.object({
  id: z.number().optional(),
  part_id: z.number(),
  part_no: z.string().nullable(),
  name: z.string(),
  type: z.enum(partType),
  cost: z.coerce.number().nullable(),
  price: z.coerce.number().gt(0),
  quantity: z.coerce.number().min(1),
  discount: z.number().nullable(),
  store_id: z.string(),
})

export type ServiceLinePartSchema = z.infer<typeof serviceLinePartValidator>
