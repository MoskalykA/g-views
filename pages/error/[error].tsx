import type { NextPage } from "next"
import { useRouter } from "next/router"

const Error: NextPage = () => {
  const router = useRouter()
  const { query } = router
  return (
    <div 
      className="p-2 max-w-xl cool-border space-y-2"
    >
      <h1 
        className="text-center break-words"
      >
        { query.error }
      </h1>

      <button 
        className="cool-button w-full"
        onClick={() => router.push("/")}
      >
        Go to the homepage!
      </button>
    </div>
  )
}

export default Error
