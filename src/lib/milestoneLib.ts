// Type definition for Milestone payload (optional)
import type { MilestonePayload, milestone_api_response } from "@/types/milstone_types";
  
  // Function to add a milestone
  export const addMilestone = async (goalId: string, milestone: MilestonePayload) => {
    const url = `http://localhost:8000/milestone/add/${goalId}/`;
    console.log("payload",JSON.stringify(milestone))
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestone),
      });
      console.log("response", response)

      if (response.ok) {

        return true; 
      }
      else{
        return false;
      }
      
    } catch (error:any) {
      console.error('Error adding milestone:', error);
      return false;
    }
  };
  

  export const deleteMilestone = async (goalID:string,milestoneID:string)=>{
    const url = `http://localhost:8000/milestone/delete/${goalID}/milestone/${milestoneID}`;
    

    try{
        const response = await fetch(url,{
            method:'DELETE',
            credentials: "include",
        })

        console.log(response)

        if (response.ok) {
            const api_response:milestone_api_response = {status_code:response.status, message:"Milestone Deleted", result:true}
            return api_response; 
          }
          else{
            const api_response:milestone_api_response = {status_code:response.status, message:"Milestone Not Deleted", result:false}
            return api_response; 
          }

    } catch(error:any){
        console.error('Error deleting milestone:', error);
        const api_response:milestone_api_response = {status_code:404, message:"Failed to request server", result:false}
            return api_response; 
    }


  }