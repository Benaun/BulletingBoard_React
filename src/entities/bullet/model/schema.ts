import { z } from 'zod';

export const bulletSchema = z.object({
    id: z.number(),
    title: z.string().min(1).optional().default(''),
    price: z.union([z.number(), z.string()]).optional().default(0),
    image: z.string().url().optional().nullable(),
    city: z.string().optional().default(''),
    owner: z.union([z.string(), z.number()]).optional().nullable(),
});

export const bulletsSchema = z.array(bulletSchema);

export interface Bullet extends z.infer<typeof bulletSchema> {}

