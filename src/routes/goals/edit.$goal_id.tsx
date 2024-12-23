import * as React from 'react'
import {createFileRoute, useLoaderData,useNavigate,useRouter} from '@tanstack/react-router'
import {goalFetchbyID, updateGoal} from "@/lib/goalLib.ts";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx";
import  {formatDate} from "@/lib/dateLib"
import { GoalUpdate } from '@/types/goal_types';
import {Select, SelectItem, SelectContent, SelectValue, SelectTrigger} from "@/components/ui/select.tsx";
import {TagsInput} from "@/components/InputTags.tsx";

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
 const navigate = useNavigate();
 const router = useRouter();

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

    console.log(goal_payload);
      updateGoal(goal_payload).then((response)=>{
        if(response){

          alert("Goal Updated");

          navigate({to: `/goals/${data.goal._id}`})
        }
        else{
          alert("Failed to update goal");
        }
      })
  }
}


  return (

     
        <div className="container lg:w-2/3 mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Edit Goal</h1>


                <div className="flex flex-row gap-4 mb-5">
                    <label htmlFor="title" className="w-36">Title</label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4 mb-5">
                    <label htmlFor="description" className="w-36">Description</label>
                    <Input id="description" value={description}
                           onChange={(e) => setDescription(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4 mb-5">
                    <label htmlFor="category" className="w-36">Category</label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4 mb-5">
                    <label className="w-36">status</label>
                    <Select  value={status} onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row gap-4 mb-5">
                    <label htmlFor="startdate" className="w-36">start date</label>
                    <Input type="date" id="startdate" value={start_date}
                           onChange={(e) => setStart_date(e.target.value)}></Input>
                </div>
                <div className="flex flex-row gap-4 mb-5">
                    <label htmlFor="enddate" className="w-36">end date</label>
                    <Input type="date" id="enddate" value={end_date}
                           onChange={(e) => setEnd_date(e.target.value)}></Input>
                </div>

                <div className="flex flex-row gap-4 mb-5">
                    <label htmlFor="tags" className="w-36">Tags</label>
                    <TagsInput value={tags} onChange={setTags} />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={()=> navigate({to:`/goals/${data.goal._id}`})} variant="secondary">Cancel</Button>
                    <Button onClick={handelsave}>Save</Button>
                </div>


        </div>

  )
}
