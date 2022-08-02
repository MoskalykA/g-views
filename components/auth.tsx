import { FiLogIn } from 'react-icons/fi'
import { useSession, signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { FC } from 'react'

const Auth: FC<{ 
   children: any,
}> = ({
   children,
}) => {
   const { data: session } = useSession({
      required: false,
      on
      onUnauthenticated() {
         toast.success('🤩 You just logged in!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
         })
      },
   })
   if(session) {
      return children
   } else {
      return (
         <button
            className="cool-button-header w-1/2"
            onClick={() => signIn('github')}
         >
            <FiLogIn/>

            <h1>
               Sign in
            </h1>
         </button>
      )
   }
}

export default Auth