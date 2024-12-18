import * as React from 'react'
import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import {goalFetchbyID} from "@/lib/goalLib.ts";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx";
import  {formatDate} from "@/lib/dateLib"
import { GoalUpdate } from '@/types/goal_types';
export const Route = createFileRoute('/goals/edit/$goal_id')({
  component: RouteComponent,
  loader:  async ({ params:{goal_id} }) => {

    return  goalFetchbyID(goal_id)
  },
})

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });

 const [title,setTitle] = useState<string>(data.goal.title? data.goal.title : "");
 const [description, setDescription] = useState<string>(data.goal.description? data.goal.description : "");
 const [category,setCategory] = useState<string>(data.goal?.category? data.goal.category:"");
 const [status,setStatus] = useState<string>(data.goal?.status? data.goal.status:"");
 const [start_date,setStart_date] = useState<string>(formatDate(data.goal?.start_date))
 const [end_date,setEnd_date] = useState<string>(formatDate(data.goal?.end_date))
 const [tags,setTags] = useState<string[]>(data.goal?.tags ? data.goal.tags : [""]);

const handelsave = ()=>{
  if(data.goal){
    const goal_payload:GoalUpdate ={
      _id: data.goal?._id? data.goal?._id:"",
      title: title,
      description: description,
      category: category,
      status: status,
      start_date: start_date,
      end_date: end_date,
      tags: tags
    }

    console.log(goal_payload)
  }
  
}

  return (

     
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Edit Goal</h1>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-row gap-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4">
                    <label htmlFor="description"
                           className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Input id="description" value={description}
                           onChange={(e) => setDescription(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">status</label>
                    <Input id="status" value={category} onChange={(e) => setStatus(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4">
                    <label htmlFor="startdate" className="block text-sm font-medium text-gray-700 mb-1">start
                        date</label>
                    <Input type="date" id="startdate" value={start_date}
                           onChange={(e) => setStart_date(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4">
                    <label htmlFor="enddate" className="block text-sm font-medium text-gray-700 mb-1">end date</label>
                    <Input type="date" id="enddate" value={end_date}
                           onChange={(e) => setEnd_date(e.target.value)}></Input>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button variant="secondary">Cancel</Button>
                    <Button onClick={handelsave}>Save</Button>
                </div>
            </div>

        </div>

  )
}
