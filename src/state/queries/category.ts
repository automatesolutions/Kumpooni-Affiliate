import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { STALE } from '#/utils/query'
import { useQuery } from '@tanstack/react-query'

export const RQKEY = () => ['parts-category']

export function usePartsCategoryQuery() {
  return useQuery({
    staleTime: STALE.INFINITY,
    queryKey: RQKEY(),
    queryFn: async () => {
      const { data, error } = await supabase.from('category').select('*')
      if (error) {
        logger.error('usePartsCategory', { error })
      }
      return data
    },
  })
}
