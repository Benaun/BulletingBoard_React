import type { Bullet } from '@/entities/bullet/model/schema'

export function getCurrentBullet(
  bullets: Bullet[] | undefined,
  id: string | number | string[] | undefined
): Bullet | undefined {
  if (!bullets || id === undefined) return undefined
  const value = Array.isArray(id) ? id[0] : id
  return bullets.find(
    bullet => String(bullet.id) == String(value)
  )
}
