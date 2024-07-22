import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deleteRepairOrderLine,
  deleteRepairOrderPart,
  updateAppointment,
  updateRepairOrderStatus,
} from './repairs.service'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { RepairOrder } from './types'
import { OrderStatusType } from '#/lib/constants'

export function useRemoveLineServiceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      orderLineId,
    }: {
      orderLineId: number
      orderId: string
    }) => {
      const { data, error } = await deleteRepairOrderLine(supabase, orderLineId)
      if (error) {
        logger.error('useRemoveLineServiceMutation', error)
        throw error
      }
      return data
    },
    onSuccess: async (data, variables) => {
      await queryClient.refetchQueries({
        queryKey: ['order', variables.orderId],
      })
    },
  })
}

export function useRemoveLinePartMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      partLineId,
    }: {
      partLineId: number
      orderId: string
    }) => {
      const { data, error } = await deleteRepairOrderPart(supabase, partLineId)
      if (error) {
        logger.error('useRemoveLineServiceMutation', error)
        throw error
      }
      return data
    },
    onSuccess: async (data, variables) => {
      await queryClient.refetchQueries({
        queryKey: ['order', variables.orderId],
      })
    },
  })
}

export function useAppointmentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      date,
      time,
    }: {
      id: string
      date: string
      time: string
      dateTime: Date
    }) => {
      const { error } = await updateAppointment(supabase, { id, date, time })
      if (error) {
        throw error
      }
    },
    onSuccess: async (data, { id, date, time, dateTime }) => {
      queryClient.setQueryData<RepairOrder>(['order', id], prev => {
        if (!prev) return
        return {
          ...prev,
          appointment_date: date,
          appointment_time: time,
          appointment_date_str: dateTime.toDateString(),
        }
      })
    },
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string
      status: OrderStatusType
    }) => {
      const { error } = await updateRepairOrderStatus(supabase, { id, status })
      if (error) {
        logger.error('useUpdateOrderStatus', { error })
        throw Error
      }
    },
    onSuccess: async (data, { id, status }) => {
      await Promise.all([
        await queryClient.refetchQueries({
          queryKey: ['appointments'],
          type: 'active',
        }),
        await queryClient.refetchQueries({
          queryKey: ['repair_orders'],
          type: 'active',
        }),
      ])
    },
  })
}
