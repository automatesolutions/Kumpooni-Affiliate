import React, { useEffect } from 'react'
import { useServices } from '../store'
import { cacheStorageCompat as mmkv } from '../cache/cache-storage'
import { supabase } from '#/lib/supabase'
import { useSession } from '../session'

let hydratedFromMmkv = false
let hydratedFromServer = false

export function RealTimeDataProvider({ children }: React.PropsWithChildren) {
  const { session } = useSession()
  const [, setServices] = useServices()

  const hydrate = async () => {
    if (!hydratedFromMmkv) {
      hydratedFromMmkv = true
      const serviceData = mmkv.getItem('services')
      if (serviceData && !hydratedFromServer) {
        console.log('servicesData', serviceData)
        setServices(JSON.parse(serviceData), true)
      }
    }
    if (!supabase) return
    const [services] = await Promise.all([
      supabase
        .from('service')
        .select('id, name')
        .filter('store_id', 'is', null),
    ])
    console.log('Services', services)
    if (services.error) {
      throw new Error('Failed to fetch core data')
    }

    hydratedFromServer = true
    setServices(services.data ?? [])
  }

  useEffect(() => {
    if (!session) return
    hydrate()
    supabase.realtime.setAuth(session.access_token)
  }, [session])

  return <>{children}</>
}
