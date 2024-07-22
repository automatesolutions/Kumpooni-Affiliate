import { Database } from '#/database'
import { groupBy } from '#/lib/functions/groupyBy'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { SupabaseClient } from '@supabase/supabase-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { RepairOrder } from './types'
import { OrderStatusTabType, OrderStatusType } from '#/lib/constants'
import { orderLineValidator, partLineValidator } from '../orders'
import { sanitize } from '#/utils/supabase'

export async function getRepairOrders(
  client: SupabaseClient<Database>,
  storeId: string,
  args: { status: OrderStatusTabType },
) {
  let query = client.from('repair_orders').select('*').eq('store_id', storeId)

  if (args.status !== 'All Orders') {
    query = query.eq('status', args.status)
  }
  query = query.order('appointment_date_str', { ascending: false }).limit(50)
  return query
}

export async function getRepairOrder(
  client: SupabaseClient<Database>,
  { id }: { id: string },
) {
  return client.from('repair_orders').select('*').match({ id: id }).single()
}

export async function upsertRepairOrderLine(
  client: SupabaseClient<Database>,
  orderLineService:
    | (Omit<z.infer<typeof orderLineValidator>, 'id'> & {})
    | (Omit<z.infer<typeof orderLineValidator>, 'id'> & {
        id: string
      }),
) {
  if ('id' in orderLineService) {
    console.log('updateRepairOrderLine')
    return client
      .from('repair_order_line')
      .update(sanitize(orderLineService))
      .eq('id', orderLineService.id)
      .select('id')
      .single()
  }
  console.log('insertNewLine', orderLineService)
  return client
    .from('repair_order_line')
    .insert([orderLineService])
    .select('id')
    .single()
}

export async function upsertRepairOrderPart(
  client: SupabaseClient<Database>,
  orderLinePart:
    | (Omit<z.infer<typeof partLineValidator>, 'id'> & {})
    | (Omit<z.infer<typeof partLineValidator>, 'id'> & {
        id: string
      }),
) {
  if ('id' in orderLinePart) {
    console.log('updateRepairOrderLine')
    return client
      .from('repair_order_part')
      .update(sanitize(orderLinePart))
      .eq('id', orderLinePart.id)
      .select('id')
      .single()
  }
  console.log('insertNewPart', orderLinePart)
  return client
    .from('repair_order_part')
    .insert([orderLinePart])
    .select('id')
    .single()
}

export async function deleteRepairOrderLine(
  client: SupabaseClient<Database>,
  orderLineId: number,
) {
  return client.from('repair_order_line').delete().eq('id', orderLineId)
}
export async function deleteRepairOrderPart(
  client: SupabaseClient<Database>,
  linePartId: number,
) {
  return client.from('repair_order_part').delete().eq('id', linePartId)
}

export function useRepairOrdersQuery(
  id: string,
  args: { status: OrderStatusTabType },
) {
  return useQuery({
    queryKey: ['repair_orders', args],
    queryFn: async () => {
      const { data, error } = await getRepairOrders(supabase, id, args)
      if (error) {
        logger.error('useRepairOrdersQuery', { error })
        throw error
      }

      // let result = {}
      // if (data) {
      //   result = groupBy('status')(data)
      // }
      if (data) {
        return data as RepairOrder[]
      }
      return []
    },
  })
}

export function useRepairOrderQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data, error } = await getRepairOrder(supabase, {
        id,
      })
      if (error) {
        console.log('error', error)
        throw error
      }

      return data as RepairOrder
    },
  })
}

export async function getRepairPayments(
  client: SupabaseClient<Database>,
  id: string,
) {
  return client.from('payments').select('*').eq('repair_order_id', id)
}

export function usePaymentHistoryQuery(id: string) {
  return useQuery({
    queryKey: ['order-payment', id],
    queryFn: async () => {
      const { data, error } = await getRepairPayments(supabase, id)
      if (error) {
        logger.error('usePaymentHistoryQuery', { error })
        throw error
      }
      return data
    },
  })
}

export function useRepairOrderLineMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      args:
        | (Omit<z.infer<typeof orderLineValidator>, 'id'> & {})
        | (Omit<z.infer<typeof orderLineValidator>, 'id'> & {
            id: string
          }),
    ) => {
      const { data, error } = await upsertRepairOrderLine(supabase, args)
      if (error) {
        console.error('useRepairOrderMutation Error', error)
      }
      console.log('datauseRepairOrderMutation', data)
    },
    onSuccess: async (data, variables) => {
      console.log('data', data)
      console.log('variables', variables)
      await queryClient.refetchQueries({
        queryKey: ['order', variables.repair_order_id],
      })
    },
  })
}

export async function updateAppointment(
  client: SupabaseClient<Database>,
  { id, date, time }: { id: string; date: string; time: string },
) {
  return client
    .from('repair_order')
    .update({ appointment_date: date, appointment_time: time })
    .eq('id', id)
}

export async function updateRepairOrderStatus(
  client: SupabaseClient<Database>,
  { id, status }: { id: string; status: OrderStatusType },
) {
  return client.from('repair_order').update({ status }).eq('id', id)
}

export function useRepairOrderLinePartMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      args:
        | (Omit<z.infer<typeof partLineValidator>, 'id'> & {})
        | (Omit<z.infer<typeof partLineValidator>, 'id'> & {
            id: string
          }),
    ) => {
      const { data, error } = await upsertRepairOrderPart(supabase, args)
      if (error) {
        console.error('useRepairOrderLinePartMutation Error', error)
      }
      console.log('useRepairOrderLinePartMutation', data)
    },
    onSuccess: async (data, variables) => {
      console.log('data', data)
      console.log('variables', variables)
      await queryClient.refetchQueries({
        queryKey: ['order', variables.repair_order_id],
      })
    },
  })
}
