import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import { FC, useState } from "react"
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
   const [viewsEnabled, setViewsEnabled] = useState(false)
   const [reputationsEnabled, setReputationsEnabled] = useState(false)
   const { data: session } = useSession()
   const id = session?.user?.id

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
                  }).catch((error: string) => {
                     router.push(`/error/${error}`)
                  })
               }).catch((error: string) => {
                  router.push(`/error/${error}`)
               })
            }}
         >
            Finish
         </button>
      </div>
   )
}

Features.defaultProps = {
   auth: true,
}

export default Features