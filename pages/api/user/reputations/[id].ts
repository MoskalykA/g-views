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
               error: "The user has not activated the reputations functionality.",
            })
         }

         if (!user.reputationsEnabled) {
            return res.status(200).json({
               reputationsEnabled: false,
            })
         }

         return res.status(200).json({
            reputationsEnabled: true,
            reputationsCount: user.reputationsCount,
         })
      case "POST":
         const { body } = req
         if(body.reputationsEnabled === undefined || typeof(body.reputationsEnabled) !== "boolean") {
            return res.status(401).json({
               error: "The user has not activated the reputations functionality.",
            })
         }

         await Prisma.user.update({
            where: {
               id,
            },
            data: {
               reputationsEnabled: body.reputationsEnabled,
            },
         })

         return res.status(200).json({
            reputationsEnabled: body.reputationsEnabled,
         })
   }
}