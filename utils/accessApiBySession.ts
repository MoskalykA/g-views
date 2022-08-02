import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'

const accessApiBySession = async (req: NextApiRequest, res: NextApiResponse) => {
   const session = await unstable_getServerSession(req, res, authOptions)
   if (!session) {
      return res.status(401).json({
         error: "You are not logged in.",
      })
   } 

   return session.user.id
}

export default accessApiBySession