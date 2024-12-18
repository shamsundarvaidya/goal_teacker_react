import * as React from 'react'
import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import {goalFetchbyID} from "@/lib/goalLib.ts";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx";
import  {formatDate} from "@/lib/dateLib"
export const Route = createFileRoute('/goals/edit/$goal_id')({
  component: RouteComponent,
  loader:  async ({ params:{goal_id} }) => {
    console.log(goal_id)
    return  goalFetchbyID(goal_id)
  },
})

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });
  console.log(data)
 const [title,setTitle] = useState(data.goal?.title);
 const [description, setDescription] = useState(data.goal?.description)
 const [category,setCategory] = useState(data.goal?.category)
 const [startdate,setStartdate] = useState(formatDate(data.goal?.start_date))
 const [enddate,setEndate] = useState(data.goal?.end_date)
 const [tags,setTags] = useState(data.goal?.tags)

console.log(startdate)

  return (

     
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Edit Goal</h1>

          <div className="flex flex-col space-y-4">
              <div className="flex flex-row gap-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input id="title" value={title} ></Input>
              </div>
              <div className="flex flex-row gap-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Input id="description" value={description} ></Input>
              </div>
              <div className="flex flex-row gap-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <Input id="category" value={category} ></Input>
              </div>
              <div className="flex flex-row gap-4">
                  <label  htmlFor="startdate" className="block text-sm font-medium text-gray-700 mb-1">startdate</label>
                  <Input type="date" id="startdate" value={startdate} onChange={(e)=> setStartdate(e.target.value)} ></Input>
              </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="secondary" >Cancel</Button>
            <Button >Save</Button>
          </div>
        </div>

      </div>

  )
}
