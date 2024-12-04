import { FC, useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Adjust path if needed
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { Note } from "@/types/notes_types";
import { updateNote } from "@/lib/notesLib";
import { useRouter } from "@tanstack/react-router";
import { formatDate } from "@/lib/dateLib";

interface NoteEditDialogProps {
  note: Note;
  goalID:string
}

export const NoteEditDialog: FC<NoteEditDialogProps> = ({ note, goalID }) => {
  const [content, setContent] = useState(note.content);
  const [noteDate, setNoteDate] = useState(formatDate(note.note_date));
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!content || !noteDate){
        setError("Empty Note or Empty Date")
        setMsg("")
    }
    else{
        const updatedNote:Note = { content, note_date: noteDate, id:note.id};
        const result = await updateNote(goalID,updatedNote)
        if(result){
            setError("");
            await router.invalidate({ filter: (match) => (match.id === `/goals/${goalID}`)})
            setMsg("Succesfully updated Note")
    
          }
          else{
            setError("Failed to add Note");
            setMsg("")
          }
    }
    

  };


  useEffect(()=>{

    if(!open){
      setError("");
      setMsg("");
    }

  },[open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="noteDate" className="block text-sm font-medium">
              Note Date
            </label>
            <input
              type="date"
              id="noteDate"
              value={noteDate}
              onChange={(e) => setNoteDate(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium">
              Note Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setOpen(false);
            }} variant="ghost" type="button">
              Close
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
        <div>
        {error && <span className="text-sm text-red-500">{error}</span>}
        {msg && <span className="text-sm text-green-500">{msg}</span>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
