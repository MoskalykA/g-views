import Image from 'next/image'
import superagent from 'superagent'
import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import { FiLogIn, FiStar, FiEye } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const MySelf: NextPage = () => {
   const router = useRouter()
   const { data: session } = useSession()
   const id = session?.user?.id

   const bioResponse = useQuery(['bio', session], async () => {
      const data = await superagent.get(`/api/user/bio/${id}`)
      return data.body
   }, {
      enabled: !!session,
   })

   const viewsResponse = useQuery(['views', session], async () => {
      const data = await superagent.get(`/api/user/views/${id}`)
      return data.body
   }, {
      enabled: !!session,
   })

   const reputationsResponse = useQuery(['reputations', session], async () => {
      const data = await superagent.get(`/api/user/reputations/${id}`)
      return data.body
   }, {
      enabled: !!session,
   })

   if (bioResponse.isLoading) return 'Loading...'
   if (reputationsResponse.isLoading) return 'Loading...'
   if (viewsResponse.isLoading) return 'Loading...'

   if (bioResponse.error) return `An error has occurred: ${bioResponse.error.message}`
   if (reputationsResponse.error) return `An error has occurred: ${reputationsResponse.error.message}`
   if (viewsResponse.error) return `An error has occurred: ${viewsResponse.error.message}`

   if (session) {
      return (
         <div
            className="cool-border space-y-4 p-2 w-fit h-fit"
         >
            <div 
               className="flex flex-col justify-center items-center cool-border p-2"
            >
               <Image
                  src={session.user?.image}
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
                     { session.user?.name }
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
               { !reputationsResponse.data.reputationsEnabled ? (
                  <h1 className="cool-border p-1">You have not activated the reputations feature.</h1>
               ) : (
                  <div className="flex justify-between">
                     <FiStar/>

                     <h1>{ reputationsResponse.data.reputationsCount }</h1>
                  </div>
               )}

               { !viewsResponse.data.viewsEnabled ? (
                  <h1 className="cool-border p-1">You have not activated the views feature.</h1>
               ) : (
                  <div className="flex justify-between">
                     <FiEye/>

                     <h1>{ viewsResponse.data.viewsCount }</h1>
                  </div>
               )}

               { (!reputationsResponse.data.reputationsEnabled && !viewsResponse.data.viewsEnabled) && (
                  <button 
                     className="cool-button-header w-full"
                     onClick={() => router.push("/features")}
                  >
                     Set up
                  </button>
               ) }
            </div>
         </div>
      )
   }

   return (
      <button
         className="cool-button-header w-1/2"
         onClick={() => signIn("github")}
      >
         <FiLogIn/>

         <h1>
            Sign in
         </h1>
      </button>
   )
}

export default MySelf
