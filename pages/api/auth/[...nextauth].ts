import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Prisma from '../../../prisma'

export const authOptions: NextAuthOptions = {
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,

         scope: 'read:user',
      }),
   ],
   secret: process.env.SECRET,
   callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         await Prisma.user.upsert({
            create: {
               id: user.id,
               name: user.name,
               bio: profile.bio,
               avatar: profile.avatar_url,
               viewsEnabled: false,
               viewsCount: 0,
               reputationsEnabled: false,
               reputationsCount: 0,
            },
            update: {
               name: user.name,
               bio: profile.bio,
               avatar: profile.avatar_url,
            },
            where: {
               id: user.id,
            }
         })

         return true
      },
      async session({ session, user, token }) {
         session.user.id = token.sub
         return session
      },
   },
}
export default NextAuth(authOptions)