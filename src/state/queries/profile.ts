import {supabase} from '#/lib/supabase'
import {SupabaseClient} from '@supabase/supabase-js'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {decode} from 'base64-arraybuffer'
import {Image as RNImage} from 'react-native-image-crop-picker'
import {logger} from '#/logger'
import {sanitize} from '#/utils/supabase'
import {STALE} from '#/utils/query'
import {Database} from '#/types/supabase'
import {SUPABASE_PROJECT} from 'react-native-dotenv'
type StoreImageUpdateParams = {
  newImage: RNImage
  storeId: string
}
const defaultPath = `https://${SUPABASE_PROJECT}.supabase.co/storage/v1/object/public/`

export function useStoreFrontUpdateMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({storeId, newImage}: StoreImageUpdateParams) => {
      const base64Str = newImage.data ?? ''
      const imageExtension = newImage.path.slice(-3)
      console.log('imageExtension', imageExtension)
      const res = decode(base64Str)

      if (!(res.byteLength > 0)) {
        console.error('[uploadToSupabase] ArrayBuffer is null')
        throw new Error('Failed to upload image.')
      }
      const imageUpload = await supabase.storage
        .from('merchant')
        .upload(`${storeId}/store-front.${imageExtension}`, res, {
          cacheControl: '0',
          contentType: newImage.mime,
          upsert: true,
        })
      if (imageUpload.error) {
        logger.error('useProfileMutation', {error: imageUpload.error})
        throw imageUpload.error
      }
      if (imageUpload.data?.path) {
        const {data, error} = await supabase
          .from('store')
          .update(
            sanitize({
              store_img: `${defaultPath}/merchant/${imageUpload.data.path}`,
            }),
          )
          .eq('id', storeId)

        if (error) {
          throw new Error('Failed to upload image')
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['store-profile']})
    },
  })
}

export function useStoreBannerUpdateMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({storeId, newImage}: StoreImageUpdateParams) => {
      const base64Str = newImage.data ?? ''
      const imageExtension = newImage.path.slice(-3)

      const res = decode(base64Str)

      if (!(res.byteLength > 0)) {
        console.error('[uploadToSupabase] ArrayBuffer is null')
        throw new Error('Failed to upload image.')
      }
      const imageUpload = await supabase.storage
        .from('merchant')
        .upload(`${storeId}/store-banner.${imageExtension}`, res, {
          cacheControl: '0',
          contentType: newImage.mime,
          upsert: true,
        })

      if (imageUpload.error) {
        logger.error('useStoreBannerUpdateMutation', {
          error: imageUpload.error,
        })
        throw imageUpload.error
      }
      if (imageUpload.data?.path) {
        const {error} = await supabase
          .from('store')
          .update(
            sanitize({
              banner_img: `${defaultPath}/merchant/${imageUpload.data.path}`,
            }),
          )
          .eq('id', storeId)

        if (error) {
          logger.error('update store banner_img', {
            error: error,
          })
          throw new Error('Failed to upload image')
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['store-profile']})
    },
  })
}

export function useStoreProfileQuery(storeId: string) {
  return useQuery({
    staleTime: STALE.SECONDS.FIFTEEN,
    queryKey: ['store-profile'],
    queryFn: async () => {
      const {data, error} = await supabase
        .from('store')
        .select('id, name, store_img, banner_img, business_hours, address')
        .eq('id', storeId)
        .single()
      if (error) {
        throw error
      }
      return data
    },
  })
}

export async function getStoreProfile(
  client: SupabaseClient<Database>,
  storeId: string,
) {
  return client
    .from('store')
    .select('id, name, store_img, banner_img, business_hours, address')
    .eq('id', storeId)
    .single()
}

// export type Parts = NonNullable<
//   Awaited<ReturnType<typeof getParts>>['data']
// >[number]

export type StoreProfile = NonNullable<
  Awaited<ReturnType<typeof getStoreProfile>>['data']
>
