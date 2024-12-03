import {FC, useState} from 'react'
import NoteForm from './NoteForm'
import { addNote } from '@/lib/notesLib'
  
type proptype = {
    goalID:string
}

const AddNote:FC<proptype> = ({goalID})=>{
    const [note,setNote] = useState("default");
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const saveNote = (note:string|undefined)=>{

        if(!note){
            setError("Empty Note")
        }
        else{
            
            setNote("");
            console.log(note)

        }

        
        
        
    }

    const clear = ()=>{
        
        setNote("");
        setError("");
        setMessage("");
    }
    

return(

    <NoteForm data={note} save={saveNote} error={error} message={message} clear={clear}/>

)

}

 export default AddNote;