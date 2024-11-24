import type {Goal} from "@/types/goal_types.ts";

export const goalFetch = async () => {
    try {
        const response = await fetch('http://localhost:8000/goals/read-goals/', {
            method: 'GET',
            credentials: 'include', // Ensure cookies (JWT) are sent with the request
        })

        if (response.status === 401) {
            // Dispatch the logout action

            throw new Error('401 ERROR')
        }

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch goals')
        }
        const data: Goal[] = await response.json()

        return { goals: data }
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const addGoal = async(goalTitle,goalDescription) =>{
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