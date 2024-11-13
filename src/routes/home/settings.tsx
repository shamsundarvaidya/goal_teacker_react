import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /home/settings!'
}
