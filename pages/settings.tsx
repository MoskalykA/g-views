import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react'
import { FiLogIn } from 'react-icons/fi'

const Settings: NextPage = () => {
   const { data: session } = useSession()
   if (session) {
      return (
         <h1 
            className="cool-border p-2"
         >
            This feature is not available.
         </h1>
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

export default Settings
