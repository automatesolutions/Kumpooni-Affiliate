import {SUPABASE_ANON_KEY, SUPABASE_URL} from 'react-native-dotenv'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createClient} from '@supabase/supabase-js'
import {Database} from '#/types/supabase'
// import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
// import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  },
)
