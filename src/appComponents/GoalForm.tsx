import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {addGoal} from "@/lib/goalLib.ts";
import {useNavigate} from "@tanstack/react-router"

export default function GoalForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleCancel = () => {
        setTitle(""); // Reset title
        setDescription(""); // Reset description
        setError("")
        navigate({to:'/goals'})

    };




    const handleSave = async () => {
            if(title.trim() && description.trim()){
                const success = await addGoal(title.trim(), description.trim());
            if (success) {
                console.log("Goal added successfully!");
                setTitle(""); // Reset form fields
                setDescription("");
                setError("")
                navigate({to:'/goals'})
            } else {
                console.error("Failed to add goal.");
                setError("Failed to add goal.")
            }
            }
            else{
                setError("Empty Title or Description")
            }
            

    };

    return (
        <>
            <form className="space-y-4 p-4 b shadow-sm w-1/2 mx-auto">
                <h2 className="text-xl font-semibold text-gray-700">Create New Goal</h2>

                {/* Goal Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Goal Title
                    </label>
                    <Input
                        id="title"
                        placeholder="Enter goal title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Goal Description Field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <Textarea
                        id="description"
                        placeholder="Enter goal description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <Input type="date" />
                </div>

                <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <Input type="date" />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Save
                    </Button>
                    
                </div>
                {error && <div className="text-red-600">{error}</div>}
            </form>
           
        </>
    );
}
