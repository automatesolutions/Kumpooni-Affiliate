import { supabase } from '#/lib/supabase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { partsValidator } from '../validations/parts'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '#/database'
import { sanitize } from '#/utils/supabase'
import { id } from 'date-fns/locale'
import { logger } from '#/logger'

export function useDeletePart(partId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('parts')
        .delete()
        .eq('id', partId)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] })
    },
  })
}

export async function upsertPart(
  client: SupabaseClient<Database>,
  part:
    | (Omit<z.infer<typeof partsValidator>, 'id'> & {})
    | (Omit<z.infer<typeof partsValidator>, 'id'> & {
        id: number
      }),
) {
  if ('id' in part) {
    return client
      .from('parts')
      .update({ ...part })
      .eq('id', part.id)
  }
  return client.from('parts').insert([part])
}

export function useUpsertPartMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ part }: { part: z.infer<typeof partsValidator> }) => {
      const { error } = await upsertPart(supabase, part)
      if (error) {
        logger.error('useUpsertPartMutation', {
          message: String(error.message),
        })
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] })
    },
  })
}
