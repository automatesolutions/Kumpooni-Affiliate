import { jwtDecode } from 'jwt-decode'
import { hasProp } from '#/lib/type-guards'
import { logger } from '#/logger'
import * as persisted from '#/state/persisted'

type SessionData = {
  user_role: string | null
  store_id: string | null
}
export function isSessionDeactivated(accessJwt: string | undefined) {
  if (accessJwt) {
    const sessData = jwtDecode(accessJwt)
    return (
      hasProp(sessData, 'scope') && sessData.scope === 'com.atproto.deactivated'
    )
  }
  return false
}

export function getUserRole(access_token: string | undefined) {
  if (access_token) {
    const sessData: SessionData = jwtDecode(access_token)
    return {
      user_role: hasProp(sessData, 'user_role') ? sessData.user_role : null,
      store_id: hasProp(sessData, 'store_id') ? sessData.store_id : null,
    }
  }
  return {
    user_role: null,
    store_id: null,
  }
}

// export function isSessionExpired(account: SessionAccount) {
//   try {
//     if (account.accessJwt) {
//       const decoded = jwtDecode(account.accessJwt)
//       if (decoded.exp) {
//         const didExpire = Date.now() >= decoded.exp * 1000
//         return didExpire
//       }
//     }
//   } catch (e) {
//     logger.error(`session: could not decode jwt`)
//   }
//   return true
// }
