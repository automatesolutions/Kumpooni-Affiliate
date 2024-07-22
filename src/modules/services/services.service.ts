import {SupabaseClient} from '@supabase/supabase-js'
import {SearchParams, ServiceStatus} from './types'
import {STALE, setGenericQueryFilters} from '#/utils/query'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {supabase} from '#/lib/supabase'
import {logger} from '#/logger'
import {
  AddServiceSchema,
  DEFAULT_SERVICE,
  serviceValidator,
} from './services.model'
import {z} from 'zod'
import {sanitize} from '#/utils/supabase'
import {
  ServiceLinePartSchema,
  serviceLinePartValidator,
} from '../parts/parts.model'
import {Database} from '#/types/supabase'

export async function getService(client: SupabaseClient<Database>, id: number) {
  return client
    .from('service')
    .select(
      `id, name, img_url, source_id, category_id, description, inclusion, is_active, is_car_required, price, service_type, status, type, 
      categories(id, name), 
      service_line(id, store_id, name, part_no, part_id, price, quantity, discount, type, cost)`,
    )
    .eq('id', id)
    .single()
}

export function useServiceQuery(id: number | undefined) {
  return useQuery({
    staleTime: 0,
    queryKey: ['service', id],
    queryFn: async () => {
      if (!id) {
        return DEFAULT_SERVICE
      }
      const {data, error} = await getService(supabase, id)
      if (error) {
        logger.error('useServiceQuery', {error})
        throw error
      }

      return {
        ...data,
        category_name: data.categories?.name,
        service: {
          id: data.id,
          name: data.name,
          source_id: data.source_id,
          category_id: data.category_id,
          price: data.price,
          is_car_required: data.is_car_required,
          is_active: data.is_active,
          inclusion: data.inclusion,
          service_type: data.service_type,
          type: data.type,
          status: data.status,
          img_url: data.img_url,
          parts: data.service_line,
        },
      } as AddServiceSchema
    },
  })
}
export async function getServices(
  client: SupabaseClient<Database>,
  storeId: string,
  args: SearchParams,
) {
  let query = client
    .from('service')
    .select('*, categories(id, name), service_line(count)')
    .eq('store_id', storeId)

  if (args.filters[0].value === 'All') {
    query = setGenericQueryFilters(query, {...args, filters: []}, [
      {column: 'name', ascending: true},
    ])
  } else {
    query = setGenericQueryFilters(query, args, [
      {column: 'name', ascending: true},
    ])
  }

  return query
}

export function useServicesPaginationQuery(
  storeId: string,
  args: SearchParams,
) {
  return useQuery({
    queryKey: ['services-list', {...args}],
    queryFn: async () => {
      const {data, error} = await getServices(supabase, storeId, args)
      if (error) {
        logger.error('paginationError', {error})
        throw error
      }
      return data
    },
    staleTime: STALE.MINUTES.FIVE,
  })
}

export async function deleteService(
  client: SupabaseClient<Database>,
  id: number,
) {
  return client.from('service').delete().eq('id', id)
}

export function useDeleteService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({id}: {id: number}) => {
      const {error} = await deleteService(supabase, id)
      if (error) {
        throw error
      }
    },
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['services-list'],
      })
    },
  })
}

export async function updateStatusService(
  client: SupabaseClient<Database>,
  id: number,
  status: ServiceStatus,
) {
  return client.from('service').update(sanitize({status})).eq('id', id)
}
export function useUpdateServiceStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({id, status}: {id: number; status: ServiceStatus}) => {
      const {error} = await updateStatusService(supabase, id, status)
      if (error) {
        logger.error('What is error', error)
        throw error
      }
    },
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['services-list'],
      })
    },
  })
}

export async function upsertService(
  client: SupabaseClient<Database>,
  args:
    | (Omit<z.infer<typeof serviceValidator>, 'id'> & {
        store_id: string
      })
    | (Omit<z.infer<typeof serviceValidator>, 'id'> & {
        id: number
      }),
) {
  const {categories, ...restArgs} = args

  if ('id' in args) {
    console.log('udpateServiec')
    return client
      .from('service')
      .update(sanitize({...restArgs}))
      .eq('id', args.id)
      .select('id')
      .single()
  }
  console.log('insertService')
  return client
    .from('service')
    .insert([{...restArgs}])
    .select('id')
    .single()
}
export function useUpdateServiceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      args:
        | (Omit<z.infer<typeof serviceValidator>, 'id'> & {
            store_id: string
          })
        | (Omit<z.infer<typeof serviceValidator>, 'id'> & {
            id: number
          }),
    ) => {
      const {data, error} = await upsertService(supabase, args)
      if (error) {
        logger.error('useUpdate', {error})
        throw error
      }
      return data
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['services-list'],
      })
    },
  })
}

export async function insertServicePartLine(
  client: SupabaseClient<Database>,
  servicePartLines:
    | (Omit<z.infer<typeof serviceLinePartValidator>, 'id'> & {
        service_id: number
      })[],
) {
  return client
    .from('service_line')
    .upsert(servicePartLines, {onConflict: 'id'})
    .select('id')
}
export function useInsertServiceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      rawArgs:
        | (Omit<z.infer<typeof serviceValidator>, 'id'> & {
            store_id: string
            parts: ServiceLinePartSchema[]
          })
        | (Omit<z.infer<typeof serviceValidator>, 'id'> & {
            id: number
            parts: ServiceLinePartSchema[]
          }),
    ) => {
      const {parts, ...args} = rawArgs

      const {data, error} = await upsertService(supabase, args)
      if (error || !data.id) {
        throw error
      }
      console.log('parts', parts)

      try {
        if (parts.length > 0 && data) {
          const lines = parts.map(part => ({
            id: part?.id,
            part_id: part.part_id,
            store_id: part.store_id,
            name: part.name,
            type: part.type,
            quantity: part.quantity,
            part_no: part.part_no,
            price: part.price,
            cost: part.cost,
            service_id: data.id,
            discount: part.discount,
          }))
          console.log('lines', lines)

          const partLines = await insertServicePartLine(supabase, lines)
          if (partLines.error) {
            throw error
          }
        }
      } catch (error) {
        logger.error('upsertServiceLine', {error})
        throw error
      }
      return data
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['services-list'],
      })
      await queryClient.invalidateQueries({
        queryKey: ['service', data.id],
      })
    },
  })
}

export async function deleteServiceLine(
  client: SupabaseClient<Database>,
  serviceLineId: number,
) {
  return client.from('service_line').delete().eq('id', serviceLineId)
}

export function useRemoveServiceLineMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      serviceLineId,
    }: {
      serviceLineId: number
      serviceId: number
    }) => {
      const {data, error} = await deleteServiceLine(supabase, serviceLineId)
      if (error) {
        logger.error('useRemoveServiceLineMutation', error)
        throw error
      }
      return data
    },
    onSuccess: async (data, variables) => {
      queryClient.setQueryData(
        ['service', variables.serviceId],
        (cache: ServiceLinePartSchema[] | undefined) => {
          if (cache) {
            return cache.filter(c => c.id !== variables.serviceLineId)
          }
          return cache
        },
      )
    },
  })
}
