import {FC,useState} from 'react'
import type { Note } from '@/types/goal_types'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from '@tanstack/react-router';
import NoteForm from './notes/NoteForm';
import { deleteNote, updateNote } from '@/lib/notesLib';
import { NoteEditDialog } from './notes/NoteEditDialog';
import { FaTrash } from "react-icons/fa";
type proptype  = {
    notes:Note[],
    goalID:string
}


const NotesDisplay :FC<proptype> = ({notes,goalID})=>{
    const router = useRouter();
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const deletehandle = async (noteID:string)=>{
        deleteNote(goalID,noteID)
        await router.invalidate({ filter: (match) => (match.id === `/goals/${goalID}`)})
    }

    const handleFormSubmit = async (updatedNote: Note) => {
        if (selectedNote) {
          await updateNote(goalID, updatedNote);
          setSelectedNote(null); // Close the dialog after submission
          await router.invalidate({ filter: (match) => match.id === `/goals/${goalID}` });
        }
      };
    
    return(
        <Card>
        <CardHeader>
            <CardTitle>Notes</CardTitle>
            <div className='flex flex-row justify-end'><NoteForm goalID={goalID} /></div>
        </CardHeader>
        <CardContent>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-600">
                            <strong>Note Date:</strong> {new Date(note.note_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm">{note.content}</p>
                        <div className='flex justify-end gap-2'>
                        <NoteEditDialog
                            note={note}
                            goalID={goalID}
                        />
                            <Button onClick={()=>{ deletehandle(note.id)}}><FaTrash /></Button>
                        </div>
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
