import React from 'react';
import { useState } from 'react';
import type {Goal,Milestone,Reminder, Note} from "@/types/goal_types.ts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import {AddMilestonePopup } from '@/appComponents/MilestoneAdd'
import { deleteMilestone } from '@/lib/milestoneLib';
import { useRouter } from '@tanstack/react-router';
import { milestone_api_response } from '@/types/milstone_types';
import { useDispatch, UseDispatch } from 'react-redux';
import { logout } from '@/appStore/loginSlice';
import { AppDispatch } from '@/appStore/store';
import NotesDisplay from './NotesDisplay';
import ReminderDisplay from './ReminderDisplay';

const GoalDisplay: React.FC<{ goal: Goal | undefined }> = ({ goal }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()

    const handelAddMilestone  = (goalID:string)=>{
        console.log("adding milestone to goal",goalID);
        setIsPopupOpen(true);

    }

    const handleClosePopup = () => {
        setIsPopupOpen(false);
      };

    const handelEditMilestone  = (goalID:string,milestoneID:string)=>{
        
    }

    const handelDeleteMilestone  =async (goalID:string,milestoneID:string)=>{
        const response = await deleteMilestone(goalID,milestoneID);
        if(response.result){
            alert("Milestone deleted")
            router.invalidate()
        }
        else if(response.status_code === 401){

            alert("401 Error");
            router.navigate({to:"/"})
            dispatch(logout())

        }
        else{
            alert(response.message);
        }
        
    }

    if(!goal){
        return (<div>
            <span className='text-xl'>Nothing to Display</span>
        </div>);
    }
    return (
        <div className="p-6 space-y-6 w-full">
            {/* Goal Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{goal.title}</CardTitle>
                    <CardDescription>{goal.description}</CardDescription>

                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <p><strong>Category:</strong> {goal.category}</p>
                            <div><strong>Status:</strong> <Badge>{goal.status}</Badge></div>

                            <p><strong>Start Date:</strong> {new Date(goal.start_date).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(goal.end_date).toLocaleDateString()}</p>
                        </div>
                        <div className="w-1/2">
                            <Progress value={goal.progress} />
                            <p className="text-md text-gray-600 mt-1">Progress: {goal.progress}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Milestones Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Milestones</CardTitle>
                    <div className='flex flex-row justify-end'> <Button onClick={()=>handelAddMilestone(goal._id)} className=''>Add Milestone</Button></div>
                    {isPopupOpen && <AddMilestonePopup goalId={goal._id} onClose={handleClosePopup} />}
                </CardHeader>
                <CardContent>
                    {goal.milestones.length > 0 ? (
                        goal.milestones.map((milestone) => (
                            <div key={milestone.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                                <p className="text-sm">{milestone.description}</p>
                                <div className="text-sm text-gray-600">
                                    <strong>Status:</strong> <Badge>{milestone.status ?? "Pending"}</Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <strong>Target Date:</strong>{" "}
                                    {milestone.target_date ? new Date(milestone.target_date).toLocaleDateString() : "N/A"}
                                </p>
                                <div className='flex flex-row justify-end gap-2'>
                                    <Button onClick={()=>handelEditMilestone(goal._id, milestone.id)}>Edit</Button>
                                    <Button onClick={()=> handelDeleteMilestone(goal._id, milestone.id)}>Delete</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No milestones added.</p>
                    )}
                </CardContent>
            </Card>

            <Separator />

            <div className="flex flex-row">
                <div className="w-1/2">
                <ReminderDisplay reminders={goal.reminders} />
                </div>

               <div className="w-1/2">
                   {/* Notes Section */}
                   <NotesDisplay notes={goal.notes} />
               </div>

            </div>

        </div>
    );
};

export default GoalDisplay;
