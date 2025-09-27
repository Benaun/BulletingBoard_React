import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { httpGet } from '@/shared/api/http'

import {
  type AppUser,
  usersSchema
} from '@/entities/user/model/schema'

async function getUsers(): Promise<AppUser[]> {
  return usersSchema.parse(await httpGet('/users'))
}

const authConfig: NextAuthOptions = {
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
    }),
    Credentials({
      name: '',
      credentials: {
        email: { label: 'email', type: 'text', required: true },
        password: {
          label: 'password',
          type: 'password',
          required: true
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        try {
          const users = await getUsers()
          const currentUser = users?.find(
            user => user.email === credentials.email
          )

          if (
            currentUser &&
            currentUser.password === credentials.password
          ) {
            return {
              id: String(currentUser.id),
              email: currentUser.email || '',
              name: currentUser.name || '',
              role: currentUser.role || 'user'
            }
          }

          return null
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!token) return {}
      if (user && 'role' in user && user.role) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (!session?.user || !token) return session

      const extendedUser = session.user as {
        id?: string
        role?: string
        name?: string | null
        email?: string | null
        image?: string | null
      }

      if (token.sub) {
        extendedUser.id = token.sub
      }
      if (token.role && typeof token.role === 'string') {
        extendedUser.role = token.role
      }

      return {
        ...session,
        user: extendedUser
      }
    }
  }
}

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }
