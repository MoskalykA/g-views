import { useQuery } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import { useState } from 'react'
import superagent from 'superagent'
import Checkbox from '../components/checkbox'

const synchronizationReputationParameters = (router: NextRouter, reputationEnabled: boolean, reputationType?: string, reputationColor?: string) => {
   superagent.post('/api/user/reputation').send({
      enabled: reputationEnabled,
      type: reputationType,
      color: reputationColor,
   }).catch((error: string) => {
      router.push(`/error/${error}`)
   })
}

const synchronizationViewParameters = (router: NextRouter, viewEnabled: boolean, viewType?: string, viewColor?: string) => {
   superagent.post('/api/user/view').send({
      enabled: viewEnabled,
      type: viewType,
      color: viewColor,
   }).catch((error: string) => {
      router.push(`/error/${error}`)
   })
}

const typeList = [
   {
      id: 'plastic',
      name: 'Plastic',
   },
   {
      id: 'flat',
      name: 'Flat',
   },
   {
      id: 'flat-square',
      name: 'Flat Square',
   },
   {
      id: 'for-the-badge',
      name: 'For the Badge',
   },
   {
      id: 'social',
      name: 'Social',
   },
]

const colorList = [
   {
      id: 'brightgreen',
      name: 'Bright Green',
   },
   {
      id: 'yellowgreen',
      name: 'Yellow Green',
   },
   {
      id: 'yellow',
      name: 'Yellow',
   },
   {
      id: 'orange',
      name: 'Orange',
   },
   {
      id: 'red',
      name: 'Red',
   },
   {
      id: 'blue',
      name: 'Blue',
   },
   {
      id: 'lightgrey',
      name: 'Light Grey',
   },
]

const Settings: NextPage = () => {
   const [viewEnabled, setViewEnabled] = useState(false)
   const [viewType, setViewType] = useState('plastic')
   const [viewColor, setViewColor] = useState('brightgreen')

   const [reputationEnabled, setReputationEnabled] = useState(false)
   const [reputationType, setReputationType] = useState('plastic')
   const [reputationColor, setReputationColor] = useState('brightgreen')

   const router = useRouter()
   const { data: session } = useSession()
   
   const viewResponse = useQuery(['view', session], async () => {
      const data = await superagent.get(`/api/user/view`)
      const body = data.body
      setViewEnabled(body.enabled)

      if(body.type) {
         setViewType(body.type)
      }

      if(body.color) {
         setViewColor(body.color)
      }

      return body
   }, {
      enabled: !!session,
   })

   const reputationResponse = useQuery(['reputation', session], async () => {
      const data = await superagent.get(`/api/user/reputation`)
      const body = data.body
      setReputationEnabled(body.enabled)

      if(body.type) {
         setReputationType(body.type)
      }

      if(body.color) {
         setReputationColor(body.color)
      }

      return body
   }, {
      enabled: !!session,
   })

   if (reputationResponse.isLoading || viewResponse.isLoading) {
      return (
         <h1>
            Loading...
         </h1>
      )
   }

   if (reputationResponse.error) {
      router.push(`/error/${reputationResponse.error}`)
      return (
         <h1>
            There is an error...
         </h1>
      )
   }

   if (viewResponse.error) {
      router.push(`/error/${viewResponse.error}`)
      return (
         <h1>
            There is an error...
         </h1>
      )
   }

   return (
      <div 
         className="flex flex-row space-x-2"
      >
         <div 
            className="cool-border"
         >
            <h1 
               className="text-center bg-zinc-800 p-2"
            >
               Profile reputations count
            </h1> 

            <div 
               className="p-2"
            >
               <Checkbox
                  label="Enabled this feature"
                  getter={reputationEnabled}
                  setter={setReputationEnabled}
               >
                  <div className="space-y-2">
                     <div>
                        <h1>
                           Type of display
                        </h1>

                        <select 
                           value={reputationType}
                           className="cool-border bg-zinc-900 p-2 focus:outline-none"
                           onChange={(e) => {
                              setReputationType(e.target.value)
                           }}
                        >
                           { typeList.map((reputationType: {
                              id: string,
                              name: string,
                           }) => {
                              return (
                                 <option 
                                    key={reputationType.id} 
                                    value={reputationType.id}
                                 >
                                    { reputationType.name }
                                 </option>
                              )
                           }) }
                        </select>
                     </div>

                     <div>
                        <h1>
                           Color of display
                        </h1>

                        <select 
                           value={reputationColor}
                           className="cool-border bg-zinc-900 p-2 focus:outline-none"
                           onChange={(e) => {
                              setReputationColor(e.target.value)
                           }}
                        >
                           { colorList.map((reputationColor: {
                              id: string,
                              name: string,
                           }) => {
                              return (
                                 <option 
                                    key={reputationColor.id} 
                                    value={reputationColor.id}
                                 >
                                    { reputationColor.name }
                                 </option>
                              )
                           }) }
                        </select>
                     </div>
                  </div>
               </Checkbox>

               <button
                  className="cool-button w-full mt-2"
                  onClick={() => {
                     synchronizationReputationParameters(router, reputationEnabled, reputationType, reputationColor)
                  }}
               >
                  Save
               </button>
            </div>
         </div>

         <div 
            className="cool-border"
         >
            <h1 
               className="text-center bg-zinc-800 p-2"
            >
               Profile views count
            </h1> 

            <div 
               className="p-2"
            >
               <Checkbox
                  label="Enabled this feature"
                  getter={viewEnabled}
                  setter={setViewEnabled}
               >
                  <div className="space-y-2">
                     <div>
                        <h1>
                           Type of display
                        </h1>

                        <select 
                           value={viewType}
                           className="cool-border bg-zinc-900 p-2 focus:outline-none"
                           onChange={(e) => {
                              setViewType(e.target.value)
                           }}
                        >
                           { typeList.map((viewType: {
                              id: string,
                              name: string,
                           }) => {
                              return (
                                 <option 
                                    key={viewType.id} 
                                    value={viewType.id}
                                 >
                                    { viewType.name }
                                 </option>
                              )
                           }) }
                        </select>
                     </div>

                     <div>
                        <h1>
                           Color of display
                        </h1>

                        <select 
                           value={viewColor}
                           className="cool-border bg-zinc-900 p-2 focus:outline-none"
                           onChange={(e) => {
                              setViewColor(e.target.value)
                           }}
                        >
                           { colorList.map((viewColor: {
                              id: string,
                              name: string,
                           }) => {
                              return (
                                 <option 
                                    key={viewColor.id} 
                                    value={viewColor.id}
                                 >
                                    { viewColor.name }
                                 </option>
                              )
                           }) }
                        </select>
                     </div>
                  </div>
               </Checkbox>

               <button
                  className="cool-button w-full mt-2"
                  onClick={() => {
                     synchronizationViewParameters(router, viewEnabled, viewType, viewColor)
                  }}
               >
                  Save
               </button>
            </div>
         </div>
      </div>
   )
}

Settings.defaultProps = {
   auth: true,
}

export default Settings