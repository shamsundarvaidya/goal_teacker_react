import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/goals')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /home/goals!'
}
