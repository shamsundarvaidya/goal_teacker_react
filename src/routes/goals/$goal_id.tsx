import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import {goalFetchbyID} from "@/lib/goalLib.ts";
import GoalDisplay from "@/appComponents/GoalDisplay.tsx";

export const Route = createFileRoute('/goals/$goal_id')({
  component: RouteComponent,
    loader:  async ({ params:{goal_id} }) => {
        return  goalFetchbyID(goal_id)
    },
})

function RouteComponent() {
    const data = useLoaderData({ from: Route.id })
    console.log(data.goal)
  return <GoalDisplay goal={data.goal} />
}
