import * as React from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

// Define the loader function for the route to fetch the goals

export const Route = createFileRoute('/goals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
