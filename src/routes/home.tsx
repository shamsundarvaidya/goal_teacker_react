import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/appStore/store'
import { useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '@/appComponents/AppSidebar'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: '/' })
    }
  }, [isLoggedIn])

 

  return (
    <div className="flex flex-row bg-amber-300 h-full">
        <Sidebar />
        <Outlet />
    </div>
  )
}
