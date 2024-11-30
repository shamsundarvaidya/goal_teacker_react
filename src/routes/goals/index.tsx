import * as React from 'react'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import NoAuthError from '@/appComponents/ERROR401.tsx'
import Goal_Header from '@/appComponents/GoalHeader.tsx'
import type { Goal } from '@/types/goal_types.ts'
import GoalList from "@/appComponents/GoalList.tsx";
import {goalFetch} from "@/lib/goalLib.ts";



export const Route = createFileRoute('/goals/')({
  component: RouteComponent,
  loader: () => goalFetch(),
  errorComponent: NoAuthError,
})

function RouteComponent() {
  console.log("rendering goal index");
  const data = useLoaderData({ from: Route.id })

  if (!data) {
    return <div>Loading...</div>
  }
  const goals: Goal[] = data.goals

  return (
    <div className="p-3 w-full">
      <Goal_Header />
      <GoalList goals={goals} />
    </div>
  )
}
