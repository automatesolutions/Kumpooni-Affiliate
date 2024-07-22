import { Database } from '#/database/types'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getUser(client: SupabaseClient<Database>, id: number) {
  return client.from('service').select('*').eq('id', id).single()
}
