import * as React from 'react'
import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import {goalFetchbyID} from "@/lib/goalLib.ts";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx";

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
 const [formData,setFormData] = useState(data.goal)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = ()=>{
    console.log(formData)
  }
  if(!data.status){
    return <div>Not found...</div>
  }

  return (

      <div>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">Edit Goal</h1>

          <div className="flex flex-col space-y-4">
              <div className="flex flex-row gap-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input id="title" value={formData.title} ></Input>
              </div>
            <Input

                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
            />

            <Input

                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
            />

            <Input

                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
            />

            <Input

                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Enter status"
            />

            <Input
                type="date"

                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
            />

            <Input
                type="date"

                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
            />

            <Input

                name="tags"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData((prevData) => ({
                  ...prevData,
                  tags: e.target.value.split(',').map(tag => tag.trim())
                }))}
                placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="secondary" >Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </div>
        </div>

      </div>

  )
}
