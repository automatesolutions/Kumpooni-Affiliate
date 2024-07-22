import React, { useCallback } from 'react'
import { AuthError, Session as SessionBase } from '@supabase/supabase-js'
import { supabase } from '#/lib/supabase'
import { logger } from '#/logger'
import { useLoggedOutViewControls } from '../shell/logged-out'
import { getUserRole } from './util'
import * as Toast from '#/components/util/Toast'
interface Session extends SessionBase {
  user_role: string | null
  store_id: string | null
}
export type SessionState = {
  isInitialLoad: boolean
  session: Session | null
}
type StateContext = SessionState & {
  hasSession: boolean
}

const StateContext = React.createContext<StateContext>({
  isInitialLoad: true,
  session: null,
  hasSession: false,
})

export type ApiContext = {
  createAccount: (props: {}) => Promise<void>
  loginWithPhone: (phone: string) => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const ApiContext = React.createContext<ApiContext>({
  createAccount: async () => {},
  loginWithPhone: async () => {},
  loginWithEmail: async () => {},
  logout: async () => {},
})

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<SessionState>({
    isInitialLoad: true,
    session: null, // assume logged out to start
  })

  const createAccount = useCallback<
    ApiContext['createAccount']
  >(async () => {}, [])

  const loginWithPhone = useCallback<ApiContext['loginWithPhone']>(
    async phone => {
      try {
        await supabase.auth.signInWithOtp({ phone })
      } catch (error) {
        logger.error('loginWithPhone', { error })
        throw new Error('Failed to login with your phone number')
      }
    },
    [supabase],
  )
  const loginWithEmail = useCallback<ApiContext['loginWithEmail']>(
    async (email, password) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        console.log('data', data)
        console.log('error', error)
        if (error) {
          throw error
        }
      } catch (error) {
        throw new Error(
          `Email or Password doesn't match our records. Try again`,
        )
      }
    },
    [supabase],
  )

  const logout = useCallback<ApiContext['logout']>(async () => {
    try {
      await supabase.auth.signOut()
      setState(prev => ({ ...prev, session: null }))
    } catch (error) {
      throw new Error('Failed to logout')
    }
  }, [supabase])

  const stateContext = React.useMemo(
    () => ({
      ...state,
      hasSession: !!state.session,
    }),
    [state],
  )
  const api = React.useMemo(
    () => ({ createAccount, loginWithPhone, logout, loginWithEmail }),
    [createAccount, loginWithPhone, loginWithEmail, logout],
  )

  React.useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        logger.debug('setting state in getSession', { session })
        const { user_role, store_id } = getUserRole(session?.access_token)
        setState(s => ({
          ...s,
          session: session
            ? {
                ...session,
                user_role,
                store_id,
              }
            : null,
          isInitialLoad: false,
        }))
      })
      .catch(error => {
        logger.error('Error: ', error)
      })
  }, [setState])

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.debug('setting state in AuthStateChange', {
        event: event,
        data: session,
      })

      const { user_role, store_id } = getUserRole(session?.access_token)
      if (event === 'SIGNED_OUT') {
        if (!user_role) {
          setState(prev => ({ ...prev, session: null }))
          return
        } else {
          setState(s => ({
            ...s,
            session: session
              ? {
                  ...session,
                  user_role,
                  store_id,
                }
              : null,
            isInitialLoad: false,
          }))
          return
        }
      }

      if (session && !user_role) {
        Toast.show('This account is not yet registered')
        logout()
        return
      } else {
        setState(s => ({
          ...s,
          session: session
            ? {
                ...session,
                user_role,
                store_id,
              }
            : null,
          isInitialLoad: false,
        }))

        return
      }

      // if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event ==='INITIAL_SESSION')
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [setState, supabase])
  return (
    <StateContext.Provider value={stateContext}>
      <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
    </StateContext.Provider>
  )
}

export function useSession() {
  return React.useContext(StateContext)
}

export function useSessionApi() {
  return React.useContext(ApiContext)
}

export function useRequireAuth() {
  const { hasSession } = useSession()
  const { setShowLoggedOut } = useLoggedOutViewControls()

  return React.useCallback(
    (fn: () => void) => {
      if (hasSession) {
        fn()
      } else {
        setShowLoggedOut(true)
      }
    },
    [hasSession, setShowLoggedOut],
  )
}
