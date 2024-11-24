import * as React from 'react';
import type {Goal} from "@/types/goal_types.ts";
import {Link} from '@tanstack/react-router'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";


const GoalList = ({goals}:{goals:Goal[]}) => {

    if (!goals || goals.length === 0) {
        return <p>No goals available</p>;
    }
    else {
        return (
        <div>

            <Table>
                <TableCaption>Goals</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Goal Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Target Date</TableHead>
                        <TableHead className=""> Recent Note</TableHead>
                        <TableHead className="text-right"> Action</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {goals.map((goal)=>{
                        let last_note = "None"
                        const notes = goal.notes;
                        if(notes && notes.length > 0){
                            const length = notes.length
                            last_note = notes[length-1].content;
                        }

                        return (
                            <TableRow key={goal._id}>
                                <TableCell>{goal.title}</TableCell>
                                <TableCell>{goal.status}</TableCell>
                                <TableCell>{goal.end_date}</TableCell>
                                <TableCell>{last_note}</TableCell>
                                <TableCell className='text-right'><Link>...</Link></TableCell>
                            </TableRow>
                        );
                    })}

                </TableBody>
            </Table>


        </div>

        )
    }


}

export default GoalList;