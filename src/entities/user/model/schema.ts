import { z } from 'zod';
import { bulletSchema } from '@/entities/bullet/model/schema';

export const userSchema = z.object({
    id: z.number(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.string().optional().default('user'),
    favorites: z.array(bulletSchema).optional().default([]),
});

export const usersSchema = z.array(userSchema);

export interface AppUser extends z.infer<typeof userSchema> {}

