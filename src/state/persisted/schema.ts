import type { Session } from '@supabase/supabase-js'
import { z } from 'zod'

// only data needed for rendering account page
const accountSchema = z.object({
  service: z.string(),
  did: z.string(),
  handle: z.string(),
  email: z.string().optional(),
  emailConfirmed: z.boolean().optional(),
  refreshJwt: z.string().optional(), // optional because it can expire
  accessJwt: z.string().optional(), // optional because it can expire
  deactivated: z.boolean().optional(),
})

const currentCarSchema = z.object({
  id: z.string().nullable(),
  brand: z.object({
    id: z.number(),
    name: z.string(),
    img_url: z.string().nullable(),
  }),
  model: z.object({
    id: z.number(),
    name: z.string(),
    img_url: z.string().nullable(),
  }),
  year_model: z.string().nullable(),
  plate_no: z.string().nullable(),
})

export type PersistedAccount = Session
export type PersistedCurrentCar = z.infer<typeof currentCarSchema>
export const schema = z.object({
  colorMode: z.enum(['system', 'light', 'dark']),
  darkTheme: z.enum(['dim', 'dark']).optional(),
  reminders: z.object({
    lastEmailConfirm: z.string().optional(),
  }),
  invites: z.object({
    copiedInvites: z.array(z.string()),
  }),
  location: z.object({
    geo: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
    address: z
      .object({
        formatted_address: z.string(),
        main_text: z.string(),
        secondary_text: z.string(),
      })
      .optional(),
  }),
  currentCar: currentCarSchema.optional(),
})
export type Schema = z.infer<typeof schema>

export const defaults: Schema = {
  colorMode: 'system',
  darkTheme: 'dim',
  reminders: {
    lastEmailConfirm: undefined,
  },
  invites: {
    copiedInvites: [],
  },
  location: {
    geo: undefined,
    address: undefined,
  },
  currentCar: undefined,
}
