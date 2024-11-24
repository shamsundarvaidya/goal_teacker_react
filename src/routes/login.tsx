import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {LoginForm} from "@/appComponents/LoginForm.tsx";

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm />
}
