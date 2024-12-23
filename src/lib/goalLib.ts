import type {Goal} from "@/types/goal_types.ts";

export const goalFetch = async () => {
    console.log("goalFetch called");
    try {
        
        const response = await fetch('http://localhost:8000/goals/read-goals/', {
            method: 'GET',
            credentials: 'include', // Ensure cookies (JWT) are sent with the request
        })
        console.log("fetched goals",response)

        if (response.status === 401) {

            throw new Error('401 ERROR')
        }

        if (!response.ok) {

            throw new Error('Failed to fetch goals')
        }
        const data: Goal[] = await response.json()

        return { goals: data }
    } catch (error: any) {
        console.log("error caught",error)
        throw new Error(error.message)
    }
}


export const addGoal = async(goalTitle:string,goalDescription:string) =>{
    try {
        const response = await fetch('http://localhost:8000/goals/add-goal/', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: goalTitle,
                description: goalDescription,
            }),
        });

        return response.ok;
    } catch (error) {
        console.error('Error saving goal:', error);

    }
}


export const goalFetchbyID = async(goalId) =>{

    try {
        console.log("goal Fetch by id called");
        const response = await fetch('http://localhost:8000/goals/read-goals/', {
            method: 'GET',
            credentials: 'include', // Ensure cookies (JWT) are sent with the request
        })
        console.log("fetched goal")

        if (response.status === 401) {

            throw new Error('401 ERROR')
        }

        if (!response.ok) {

            throw new Error('Failed to fetch goals')
        }
        const data: Goal[] = await response.json()
        console.log(data)

        const filtered_data = data.find((goal)=> goal._id === goalId)

        return { goal: filtered_data, status: !!filtered_data }
    } catch (error: Error) {
        console.log(error)
        throw new Error(error.message)
    }

}


export const deleteGoal = async (goal_id:string)=>{
    const url = `http://localhost:8000/goals/delete-goal/${goal_id}`

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
}

export const updateGoal = async(goal_payload:GoalUpdate) =>{
    try {
        const response = await fetch('http://localhost:8000/goals/update/', {
            method: 'PUT',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal_payload),
        });

        return response.ok;
    } catch (error) {
        console.error('Error saving goal:', error);
        return false;

    }
}