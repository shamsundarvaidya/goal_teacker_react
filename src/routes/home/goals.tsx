import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {useLoaderData} from '@tanstack/react-router'

interface Goal {
  _id: string
  title: string
  description: string
  category: string
  status: string
  progress: number
  start_date: string
  end_date: string
  milestones: any[]
  reminders: any[]
  notes: any[]
}

// Define the loader function for the route to fetch the goals
const goalFetch = async () => {
  try {
    const response = await fetch('http://localhost:8000/goals/read-goals/', {
      method: 'GET',
      credentials: 'include',  // Ensure cookies (JWT) are sent with the request
    })
    if (!response.ok) {
      throw new Error('Failed to fetch goals')
    }
    const data:Goal[] = await response.json()

    return { goals: data }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const Route = createFileRoute('/home/goals')({
  component: RouteComponent,
  loader: () => goalFetch()
})



function RouteComponent({ loaderData }: { loaderData: { goals: Goal[] } }) {

  console.log(loaderData)
  const loaderdata = useLoaderData({ from: '/home/goals' })

  if(!loaderdata){
    return <div>Loading...</div>
  }
  const goals = loaderdata.goals

  return (
      <div>
        <h1>Goals</h1>
        {goals.length === 0 ? (
            <p>No goals available</p>
        ) : (
            <ul>
              {goals.map((goal) => (
                  <li key={goal._id}>
                    <h2>{goal.title}</h2>
                    <p>{goal.description}</p>
                    <p>Category: {goal.category}</p>
                    <p>Status: {goal.status}</p>
                    <p>Progress: {goal.progress}%</p>
                    <p>Start Date: {new Date(goal.start_date).toLocaleDateString()}</p>
                    <p>End Date: {new Date(goal.end_date).toLocaleDateString()}</p>
                    {/* Display milestones, reminders, and notes if needed */}
                  </li>
              ))}
            </ul>
        )}
      </div>
  )
}


