import type { NextPage } from 'next'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import { useState } from 'react'
import superagent from 'superagent'
import Checkbox from '../components/checkbox'

const synchronizationViewsParameters = (router: NextRouter, viewsEnabled: boolean, viewsDisplayType?: string) => {
   superagent.post('/api/user/views').send({
      viewsEnabled,
      viewsDisplayType,
   }).catch((error: string) => {
      router.push(`/error/${error}`)
   })
}

const viewsDisplayList = [
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

const Settings: NextPage = () => {
   const router = useRouter()
   const [viewsEnabled, setViewsEnabled] = useState(false)
   const [viewsDisplayType, setViewsDisplayType] = useState('plastic')
   return (
      <div 
         className="cool-border w-1/2"
      >
         <h1 
            className="text-center bg-zinc-800 p-2"
         >
            Profile view count
         </h1> 

         <div 
            className="p-2"
         >
            <Checkbox
               label="Enabled this feature"
               getter={viewsEnabled}
               setter={setViewsEnabled}
            >
               <h1>
                  Type of display
               </h1>

               <select 
                  value={viewsDisplayType}
                  className="cool-border bg-zinc-900 p-2 focus:outline-none"
                  onChange={(e) => {
                     setViewsDisplayType(e.target.value)
                  }}
               >
                  { viewsDisplayList.map((viewsDisplay: {
                     id: string,
                     name: string,
                  }) => {
                     return (
                        <option 
                           key={viewsDisplay.id} 
                           value={viewsDisplay.id}
                        >
                           { viewsDisplay.name }
                        </option>
                     )
                  }) }
               </select>
            </Checkbox>

            <button
               className="cool-button w-full mt-2"
               onClick={() => {
                  synchronizationViewsParameters(router, viewsEnabled, viewsDisplayType)
               }}
            >
               Save
            </button>
         </div>
      </div>
   )
}

Settings.defaultProps = {
   auth: true,
}

export default Settings