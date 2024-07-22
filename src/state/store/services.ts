import { useNanoStore } from '#/modules/appointment/hooks/useNanoStore'

import { atom } from 'nanostores'

export type ListItem = {
  id: number
  name: string
}

type Service = ListItem & {}
const $serviceStore = atom<Service[]>([])

export const useServices = () =>
  useNanoStore<Service[]>($serviceStore, 'services')
