import { z } from 'zod'

export const bulletSchema = z.object({
  id: z
    .union([z.number(), z.string()])
    .transform(val =>
      typeof val === 'string' ? parseInt(val, 10) : val
    ),
  title: z.string().optional().default(''),
  price: z.union([z.number(), z.string()]).optional().default(0),
  image: z.string().optional().nullable(),
  city: z.string().optional().default(''),
  ownerId: z
    .union([z.number(), z.string()])
    .optional()
    .nullable()
    .transform(val =>
      val === null || val === undefined
        ? val
        : typeof val === 'string'
          ? parseInt(val, 10)
          : val
    ),
  category: z.string().optional(),
  phone: z.string().optional(),
  region: z.string().optional(),
  street: z.string().optional(),
  description: z.string().optional(),
  email: z.string().optional()
})

export const bulletsSchema = z.array(bulletSchema)

export type Bullet = z.infer<typeof bulletSchema>
