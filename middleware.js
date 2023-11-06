export { default } from "next-auth/middleware"

export const config = { matcher: ['/bullet/:path*', '/profile/:path*', '/addBullet']}