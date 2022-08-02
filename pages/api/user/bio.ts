/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from '../../../prisma'
import accessApiBySession from '../../../utils/accessApiBySession'

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const id = await accessApiBySession(req, res)
   const method = req.method

   const user = await Prisma.user.findUnique({
      where: {
         id: id as string,
      }
   }).catch((error: string) => {
      return res.status(500).json({
         error: error,
      })
   })

   switch (method) {
      case 'GET':
         if (!user || !user.bio) {
            return res.status(500).json({
               error: 'The feature does not work for you.',
            })
         }

         return res.status(200).json({
            bio: user.bio,
         })
      default:
         return res.status(405).json({
            error: 'Method not allowed.',
         })
   }
}