export interface milestone_api_response{
    result:boolean,
    status_code: number,
    message?:string
}

export type MilestonePayload = {
    title: string;
    description?: string;
    target_date?: string;
    
  };

export interface Milestone {
    id?: string; // Optional as it may be generated
    title: string; // Required field
    description?: string; // Optional field
    target_date?: Date; // Optional field, can use `Date` for datetime
    status?: "Pending" | "Completed" | "In Progress"; // Optional with default "Pending", add more statuses as needed
    completed_date?: Date; // Optional field
}