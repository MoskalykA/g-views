/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from '../../../../prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query
   const user = await Prisma.user.findFirst({
      where: {
         id,
      }
   })

   if(!user ||!user.bio) {
      return res.status(401).json({
         error: 'The user does not have a biography.',
      })
   }

   res.status(200).json({
      bio: user.bio,
   })
}