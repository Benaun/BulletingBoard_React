import { z } from 'zod'

import { bulletSchema } from '@/entities/bullet/model/schema'

export const userSchema = z.object({
  id: z
    .union([z.number(), z.string()])
    .transform(val =>
      typeof val === 'string' ? parseInt(val, 10) : val
    ),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional().default('user'),
  favorites: z.array(bulletSchema).optional().default([])
})

export const usersSchema = z.array(userSchema)

export type AppUser = z.infer<typeof userSchema>
