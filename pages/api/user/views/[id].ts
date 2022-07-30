/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next"
import Prisma from "../../../../prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { method } = req
   const { id } = req.query

   switch (method) {
      case "GET":
         const user = await Prisma.user.findFirst({
            where: {
               id,
            }
         })

         if (!user) {
            return res.status(401).json({
               error: "The user has not activated the views functionality.",
            })
         }

         if (!user.viewsEnabled) {
            return res.status(200).json({
               viewsEnabled: false,
            })
         }

         return res.status(200).json({
            viewsEnabled: true,
            viewsCount: user.viewsCount,
         })
      case "POST":
         const { body } = req
         if(body.viewsEnabled === undefined || typeof(body.viewsEnabled) !== "boolean") {
            return res.status(401).json({
               error: "The user has not activated the views functionality.",
            })
         }

         await Prisma.user.update({
            where: {
               id,
            },
            data: {
               viewsEnabled: body.viewsEnabled,
            },
         })

         return res.status(200).json({
            viewsEnabled: body.viewsEnabled,
         })
   }
}