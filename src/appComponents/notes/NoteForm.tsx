import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { addNote } from "@/lib/notesLib";
import { Textarea } from "@/components/ui/textarea";
import { notePayload } from '@/types/notes_types';
import { useRouter } from '@tanstack/react-router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  
} from "@/components/ui/dialog";

type proptype = {
  goalID: string;
};

const NoteForm: FC<proptype> = ({ goalID }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  useEffect(()=>{

    if(!open){
      setError("");
      setMsg("");
    }

  },[open]);

  const postNote= async ()=>{
    const note = textareaRef.current?.value;
    if(!note){
      setError("Empty Note")
      setMsg("")
  }
  else{  
      const payload:notePayload = {
          note_date : new Date().toISOString(),
          content: note,
          
      }

      const result = await addNote(payload,goalID);
      if(result.success){
        setError("");
        await router.invalidate({ filter: (match) => (match.id === `/goals/${goalID}`)})
        setMsg("Succesfully added Note")

      }
      else{
        setError("Failed to add Note");
        setMsg("")
      }
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Note</DialogTitle>
          <DialogDescription>
            Note important information related to the goal
          </DialogDescription>
        </DialogHeader>
        <Textarea ref={textareaRef} id="description"  />
        <DialogFooter>
          <div className="flex flex-row justify-between w-full">
          <div>
          {error && <span className="text-sm text-red-500">{error}</span>}
          {msg && <span className="text-sm text-green-500">{msg}</span>}
          </div>
          <div className="space-x-1">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>

          <Button
            type="button"
            onClick={postNote}
          >
            Save
          </Button>
          </div>
          
          </div>

          
          
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;
