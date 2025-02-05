import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string(),

  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
  //   message:
  //     "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
  // }),
})
