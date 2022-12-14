/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from '../../../prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const method = req.method
   const id = req.query.id

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

   if(!view?.enabled) {
      return res.status(500).json({
         error: 'The user has not activated this feature.',
      })
   }

   switch (method) {
      case 'GET':
         await Prisma.view.update({
            where: {
               id: viewId,
            },
            data: {
               count: view.count + 1,
            },
         })

         return res.status(200).send(`<html><body><img src="https://img.shields.io/static/v1?label=Profile%20views&message=${view.count}&color=${view?.color}&style=${view?.type}"/></body></html>`)
      default:
         return res.status(405).json({
            error: 'Method not allowed.',
         })
   }
}