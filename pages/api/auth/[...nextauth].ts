import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Prisma from '../../../prisma'

export const authOptions: NextAuthOptions = {
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,

         authorization: {
            params: {
               scope: 'read:user',
            }
         }
      }),
   ],
   secret: process.env.SECRET,
   callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         await Prisma.user.upsert({
            create: {
               id: user.id,
               name: user.name as string,
               bio: profile.bio as string,
               avatar: profile.avatar_url as string,
               view: {
                  create: {},
               },
               reputation: {
                  create: {},
               },
            },
            update: {
               name: user.name as string,
               bio: profile.bio as string,
               avatar: profile.avatar_url as string,
            },
            where: {
               id: user.id,
            }
         })

         return true
      },
      async session({ session, user, token }) {
         session.user.id = token.sub as string
         return session
      },
   },
}
export default NextAuth(authOptions)