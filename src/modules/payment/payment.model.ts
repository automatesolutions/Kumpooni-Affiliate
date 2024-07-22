import { z } from 'zod'

export const paymentValidator = z.object({
  payment_method: z.enum(['Cash', 'Gcash', 'Bank', 'Maya']),
  payment_date: z.string(),
  amount: z.coerce.number().min(1),
  reference_no: z.string().optional(),
  description: z.string().optional(),
  store_id: z.string().optional(),
})
