import { FC } from 'react'

const Checkbox: FC<{ 
   label: String,
   getter: any,
   setter: any,
   children?: any,
}> = ({
   label,
   getter,
   setter,
   children,
}) => {
   return (
      <>
         <div 
            className="flex justify-center items-center space-x-2 hover:cursor-pointer"
         >
            <h1>
               { label }
            </h1>

            <div 
               className={`cool-button w-4 h-4 ${getter ? "bg-zinc-800" : ""}`}
               onClick={() => setter(!getter)}
            />
         </div> 
         
         { getter && (
            <div 
               className="p-2 mt-2 bg-zinc-800 rounded"
            >
               { children }
            </div>
         )}
      </>
   )
}

export default Checkbox