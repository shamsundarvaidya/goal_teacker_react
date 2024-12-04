import type { Note, notePayload } from "@/types/notes_types";


export const addNote = async (payload:notePayload,goal_id:string)=> {
    const url = `http://localhost:8000/note/add/${goal_id}/`
    
    try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log("response", response)
        return {status:response.status,success:response.ok};
        
      } catch (error:any) {
        console.error('Error adding notes:', error);
        return {success:false};
      }

};


export const deleteNote = async (goal_id:string,note_id:string)=> {
    const url = `http://localhost:8000/note/delete/${goal_id}/note/${note_id}`
    
    try{
        const response = await fetch(url,{
            method:'DELETE',
            credentials: "include",
        })

        console.log(response)

       return response.ok

    } catch(error:any){
        console.error('Error deleting milestone:', error);
        
            return false; 
    }

};

export const updateNote = async (goal_id:string,note:Note)=> {
    const url = `http://localhost:8000/note/update/${goal_id}`
    
    try{
        const response = await fetch(url,{
            method:'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(note),
        })

        console.log(response)

       return response.ok

    } catch(error:any){
        console.error('Error deleting milestone:', error);
        
            return false; 
    }

};
