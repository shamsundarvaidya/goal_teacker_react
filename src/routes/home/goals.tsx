import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {useLoaderData, ErrorComponent  } from '@tanstack/react-router'
import GoalItem from '@/appComponents/GoalItem'
import type { Goal} from '@/types/goal_types'
import { logout } from '@/appStore/loginSlice'
import { useDispatch } from 'react-redux'; //
import { AppDispatch } from '@/appStore/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

// Define the loader function for the route to fetch the goals
const goalFetch = async () => {
  try {
    const response = await fetch('http://localhost:8000/goals/read-goals/', {
      method: 'GET',
      credentials: 'include',  // Ensure cookies (JWT) are sent with the request
    })

    if (response.status === 401) {
      // Dispatch the logout action
     
      throw new HttpError(401, "401 ERROR");
    }

    if (!response.ok) {
      console.log(response)
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
  loader: () => goalFetch(),
  errorComponent: Unauthorized
})


function Unauthorized({error}){
  const dispatch  = useDispatch<AppDispatch>();
  if(error.message == "401 ERROR"){
    dispatch(logout());

    return(
      <div>
        {error.message}
      </div>);

  }


  // Fallback to the default ErrorComponent
  return <ErrorComponent error={error} />

}


function RouteComponent() {
  
  
  const loaderdata = useLoaderData({ from: '/home/goals' })



  if(!loaderdata){
    return <div>Loading...</div>
  }
  const goals = loaderdata.goals

  return (
      <div className='p-3 w-full'>
        <div id='header' className='flex flex-row justify-between pb-2 px-4 mb-5 border-b-2'>
          <div className=''>
            <span className='text-xl text-blue-500'>GOALS</span>
          </div>
          
          

          <div id="header-action" className='flex flex-row gap-2'>
          <div>
            <Input placeholder='search by tag' name='search_term'></Input>
          </div>
            <Button>Filter</Button>
            <Button className=''>+New Goal</Button>
          </div>

        </div>

        {goals.length === 0 ? (
            <p>No goals available</p>
        ) : (
            <div>
              {goals.map((goal) => (
                  <GoalItem key={goal._id} data={goal} />
              ))}
            </div>
        )}
      </div>
  )
}


