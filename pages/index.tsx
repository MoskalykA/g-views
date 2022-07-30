import type { NextPage } from "next"
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {JSON.stringify(session.user)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <h1>dfddf</h1>
  )
}

export default Home
