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
            const success = await addGoal(title, description);
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

    };

    return (
        <>

            <form className="space-y-4 p-4 b shadow-sm w-1/2 mx-auto" onSubmit={handleSave}>
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

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </form>
            {error && <div>error</div>}
        </>
    );
}
