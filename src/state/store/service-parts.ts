import { ServiceLinePartSchema as Part } from '#/modules/parts/parts.model'

import { create } from 'zustand'

interface ServiceParts {
  parts: Part[]
  setParts: (parts: Part[]) => void
  addPart: (part: Part) => void
  editPart: (id: number, part: Part) => void
  removePart: (id: number) => void
  clearParts: () => void
}
export const useServiceParts = create<ServiceParts>((set, get) => ({
  parts: [],
  setParts: (parts: Part[]) => {
    set({ parts: parts })
  },
  addPart: (part: Part) => {
    set({ parts: [...get().parts, part] })
  },
  editPart: (id: number, part: Part) => {
    const updatedParts = get().parts.map(p =>
      p.id === id ? { ...p, ...part } : p,
    )
    return set({ parts: updatedParts })
  },
  removePart: (id: number) => {
    set({ parts: [...get().parts.filter(part => part.id !== id)] })
  },
  clearParts: () => {
    set({ parts: [] })
  },
}))
