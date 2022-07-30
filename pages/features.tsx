import type { NextPage } from "next"
import { useSession, signIn } from "next-auth/react"
import { FC, useState } from "react"
import { FiLogIn } from "react-icons/fi"
import { useRouter } from "next/router"
import superagent from "superagent"

const Feature: FC<{ 
   label: String,
   getter: any,
   setter: any,
}> = ({
   label,
   getter,
   setter,
}) => {
   return (
      <div 
         className="flex justify-center items-center space-x-2"
      >
         <h1>
            { label }
         </h1>

         <div 
            className={`cool-button w-4 h-4 ${getter ? "bg-zinc-800" : ""}`}
            onClick={() => setter(!getter)}
         />
      </div> 
   )
}

const Features: NextPage = () => {
   const router = useRouter()
   const { data: session } = useSession()
   const [viewsEnabled, setViewsEnabled] = useState(false)
   const [reputationsEnabled, setReputationsEnabled] = useState(false)
   const id = session?.user?.id

   if (session) {
      return (
         <div
            className="cool-border p-2 w-fit h-fit"
         >
            <Feature 
               label="Activating the views feature" 
               getter={viewsEnabled} 
               setter={setViewsEnabled}
            />

            <Feature 
               label="Activating the reputations feature" 
               getter={reputationsEnabled} 
               setter={setReputationsEnabled}
            />

            <button
               className="cool-button w-full mt-4"
               onClick={() => {
                  superagent.post(`/api/user/reputations/${id}`).send({
                     reputationsEnabled,
                  }).then(() => {
                     superagent.post(`/api/user/views/${id}`).send({
                        viewsEnabled,
                     }).then(() => {
                        router.push("/myself")
                     }).catch((error) => {
                        router.push(`/error/${error}`)
                     })
                  }).catch((error) => {
                     router.push(`/error/${error}`)
                  })
               }}
            >
               Finish
            </button>
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

export default Features
