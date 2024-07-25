import { useSession } from '#/state/session'
import * as notifications from '#/lib/notification'
import React, { useCallback } from 'react'
import { isAndroid } from '#/platform/detection'

export function useNotificationRegistration() {
  const { session } = useSession()
  // start undefined
  const currentAccount = React.useRef<string | undefined>(undefined)

  React.useEffect(() => {
    if (session && currentAccount.current !== session.user.id) {
      currentAccount.current = session.user.id
      notifications.getFCMToken(session.user.id)
      const unsub = notifications.registerTokenChangeHandler(session)
      return unsub
    }
  }, [session])
}
