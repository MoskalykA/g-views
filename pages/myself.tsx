import Image from 'next/image'
import superagent from 'superagent'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { FiStar, FiEye } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const MySelf: NextPage = () => {
   const router = useRouter()
   const { data: session } = useSession()
   
   const bioResponse = useQuery(['bio', session], async () => {
      const data = await superagent.get(`/api/user/bio`)
      return data.body
   }, {
      enabled: !!session,
   })

   const viewsResponse = useQuery(['views', session], async () => {
      const data = await superagent.get(`/api/user/view`)
      return data.body
   }, {
      enabled: !!session,
   })

   const reputationsResponse = useQuery(['reputations', session], async () => {
      const data = await superagent.get(`/api/user/reputation`)
      return data.body
   }, {
      enabled: !!session,
   })

   if (bioResponse.isLoading || reputationsResponse.isLoading || viewsResponse.isLoading) {
      return (
         <h1>
            Loading...
         </h1>
      )
   }

   if (bioResponse.error) {
      router.push(`/error/${bioResponse.error}`)
      return (
         <h1>
            There is an error...
         </h1>
      )
   }

   if (reputationsResponse.error) {
      router.push(`/error/${reputationsResponse.error}`)
      return (
         <h1>
            There is an error...
         </h1>
      )
   }

   if (viewsResponse.error) {
      router.push(`/error/${viewsResponse.error}`)
      return (
         <h1>
            There is an error...
         </h1>
      )
   }

   return (
      <div
         className="cool-border space-y-4 p-2 w-fit h-fit"
      >
         <div 
            className="flex flex-col justify-center items-center cool-border p-2"
         >
            <Image
               src={session?.user?.image as string}
               alt="Picture of the author"
               width={128}
               height={128}
               className="rounded-lg"
            />

            <div 
               className="text-center space-y-4"
            >
               <h1 
                  className="text-xl"
               >
                  { session?.user?.name }
               </h1>

               <div 
                  className="mx-auto bg-zinc-800 rounded w-1/2"
               >
                  <p>
                     { bioResponse.data.bio }
                  </p>
               </div>
            </div>
         </div>

         <div 
            className="flex flex-col space-y-2 cool-border p-2"
         >
            { !reputationsResponse.data.enabled ? (
               <h1 className="cool-border p-2">You have not activated the reputations feature.</h1>
            ) : (
               <div className="flex justify-between">
                  <FiStar/>

                  <h1>{ reputationsResponse.data.count }</h1>
               </div>
            )}

            { !viewsResponse.data.enabled ? (
               <h1 className="cool-border p-2">You have not activated the views feature.</h1>
            ) : (
               <div className="flex justify-between">
                  <FiEye/>

                  <h1>{ viewsResponse.data.count }</h1>
               </div>
            )}
         </div>
      </div>
   )
}

MySelf.defaultProps = {
   auth: true,
}

export default MySelf