import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import RootLayout from '@/appComponents/AppRootLayout'

export const Route = createRootRoute({
  component: ()=>{

    return (
    <>
    
    <RootLayout />
   
    <TanStackRouterDevtools />
    </>
    
  )
  },
})