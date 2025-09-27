import type { AppUser } from '@/entities/user/model/schema'

export function getCurrentUser(
  users: AppUser[] | undefined,
  id: string | number | string[] | undefined
): AppUser | undefined {
  if (!users || id === undefined) return undefined
  const value = Array.isArray(id) ? id[0] : id
  return users.find(user => String(user.id) == String(value))
}
