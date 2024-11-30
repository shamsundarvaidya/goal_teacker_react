import * as React from 'react'
import {createFileRoute, useLoaderData, useMatches} from '@tanstack/react-router'

import {goalFetchbyID} from "@/lib/goalLib.ts";
import NoAuthError from "@/appComponents/ERROR401.tsx";
import GoalDisplay from "@/appComponents/GoalDisplay.tsx";

export const Route = createFileRoute('/goals/$goal_id')({
  component: RouteComponent,
  loader: async ({params })=> goalFetchbyID(params.goal_id),
  errorComponent: NoAuthError,
})

function RouteComponent() {
  const data = useLoaderData({ from: Route.id })
  let goal  = data.goal;

  return <GoalDisplay goal={goal} />
}
