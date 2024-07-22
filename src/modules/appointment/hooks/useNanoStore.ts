import { useStore } from '@nanostores/react'

import { type WritableAtom } from 'nanostores'
import { useCallback } from 'react'
import { cacheStorageCompat } from '#/state/cache/cache-storage'

export function useNanoStore<T>(atom: WritableAtom<T>, idbKey?: string) {
  const value = useStore(atom)

  const set = useCallback(
    (value: T | ((current: T) => T), initial = false) => {
      if (typeof value === 'function') {
        atom.set((value as (current: T) => T)(atom.get()))
        if (idbKey && !initial) cacheStorageCompat.setItem(idbKey, atom.get())
      } else {
        atom.set(value)
        if (idbKey && !initial) cacheStorageCompat.setItem(idbKey, value)
      }
    },
    [atom, idbKey],
  )

  return [value, set] as const
}
