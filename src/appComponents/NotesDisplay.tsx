import {FC,useState} from 'react'
import type { Note } from '@/types/goal_types'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
type proptype = {
    notes:Note[]
}

const handelAddNotes = (goalID)={
    

}

const NotesDisplay :FC<proptype> = ({notes})=>{
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    
    return(
        <Card>
        <CardHeader>
            <CardTitle>Notes</CardTitle>
            <div className='flex flex-row justify-end'> <Button onClick={()=>handelAddNotes(goal._id)} className=''>Add Milestone</Button></div>
        </CardHeader>
        <CardContent>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-600">
                            <strong>Note Date:</strong> {new Date(note.note_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm">{note.content}</p>
                    </div>
                ))
            ) : (
                <p>No notes added.</p>
            )}
        </CardContent>
    </Card>
    );
}

export default NotesDisplay;
