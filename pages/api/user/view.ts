/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from '../../../prisma'
import accessApiBySession from '../../../utils/accessApiBySession'

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const id = await accessApiBySession(req, res)
   const method = req.method
   const body = req.body

   const user = await Prisma.user.findUnique({
      where: {
         id: id as string,
      }
   }).catch((error: string) => {
      return res.status(500).json({
         error: error,
      })
   })

   const viewId = user?.viewId
   const view = await Prisma.view.findUnique({
      where: {
         id: viewId,
      }
   }).catch((error: string) => {
      return res.status(500).json({
         error: error,
      })
   })

   switch (method) {
      case 'GET':
         if (!view) {
            return res.status(500).json({
               error: 'The feature does not work for you.',
            })
         }

         return res.status(200).json({
            enabled: view.enabled,
            count: view.count,
            type: view.type,
            color: view.color,
         })
      case 'POST':
         await Prisma.view.upsert({
            create: {
               enabled: body.enabled,
               type: body.type,
               color: body.color,
            },
            update: {
               enabled: body.enabled,
               type: body.type,
               color: body.color,
            },
            where: {
               id: viewId,
            },
         }).catch((error: string) => {
            return res.status(500).json({
               error: error,
            })
         })

         return res.status(200).json({
            success: 'The parameters have been updated.',
         })
      default:
         return res.status(405).json({
            error: 'Method not allowed.',
         })
   }
}