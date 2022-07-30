import "../styles/globals.css"
import { useRouter } from "next/router"
import { SessionProvider } from "next-auth/react"
import { FiHome, FiUser, FiEye, FiSettings } from "react-icons/fi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <div 
      className="flex flex-row"
    >
      <div 
        className="flex flex-col justify-between w-1/6 h-screen cool-border p-4"
      >
        <button 
          className="cool-button-header"
          onClick={() => router.push("/")}
        >
          <FiHome/>

          <h1>
            Home
          </h1>
        </button>

        <div 
          className="flex flex-col justify-between space-y-2"
        >
          <button 
            className="cool-button-header"
          >
            <FiEye/>

            <h1>
              Display
            </h1>
          </button>

          <button 
            className="cool-button-header"
            onClick={() => router.push("/myself")}
          >
            <FiUser/>

            <h1>
              Myself
            </h1>
          </button>
        </div>

        <button 
          className="cool-button-header"
          onClick={() => router.push("/settings")}
        >
          <FiSettings/>

          <h1>
            Settings
          </h1>
        </button>
      </div>

      <div 
        className="flex justify-center items-center w-screen"
      >
        <QueryClientProvider client={queryClient}>
          <SessionProvider
            session={pageProps.session}
          >
            <Component {...pageProps} />
          </SessionProvider>
        </QueryClientProvider>
      </div>
    </div>
  )
}