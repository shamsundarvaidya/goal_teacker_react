import {FC, useRef, useState} from 'react'
import { Button } from '@/components/ui/button' 
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"

type proptype = {
    data:string,
    save: (note: string| undefined) => void,
    clear: () => void,
    error:string,
    message:string,
}

const NoteForm:FC<proptype> = ({data,error,message,save,clear})=>{

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [open, setOpen] = useState(false);

    return (
<Dialog open={open} onOpenChange={setOpen} >
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
    <Textarea ref={textareaRef} id="description"  defaultValue={data}/>
    <DialogFooter className="sm:justify-end">
            <Button type="button" variant="secondary" onClick={()=>{clear();setOpen(false)}}>
              Close
            </Button>
          
          <Button type="button" onClick={()=> save(textareaRef.current?.value)} >
              Save
            </Button>
            
        </DialogFooter>
        {error && <span>{error}</span>}
  </DialogContent>
</Dialog>

    );
}

export default NoteForm;