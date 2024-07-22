import {SupabaseClient} from '@supabase/supabase-js'
import {z} from 'zod'
import {paymentValidator} from './payment.model'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {supabase} from '#/lib/supabase'
import {Database} from '#/types/supabase'

type insertPayment = z.infer<typeof paymentValidator> & {
  repair_order_id: string
}
export async function insertPayment(
  client: SupabaseClient<Database>,
  input: insertPayment,
) {
  return client.from('payments').insert([input])
}

export function useInsertPayment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: insertPayment) => {
      const {data, error} = await insertPayment(supabase, input)
      if (error) {
        throw error
      }
      console.log('result', data)
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries({
        queryKey: ['order', variables.repair_order_id],
      })
      qc.invalidateQueries({
        queryKey: ['order-payment', variables.repair_order_id],
      })
      qc.invalidateQueries({
        queryKey: ['appointments'],
      })
    },
  })
}
