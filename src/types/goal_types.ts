export interface Goal {
    _id: string
    title: string
    description: string
    category: string
    status: string
    progress: number
    start_date: string
    end_date: string
    milestones: Milestone[]
    reminders: Reminder[]
    notes: Note[]
  }

  export interface Note {
      id: string; // Optional unique identifier
      note_date: string; // ISO 8601 string for the date
      content: string; // Content of the note
  }


export interface Milestone {
    id?: string; // Optional as it may be generated
    title: string; // Required field
    description?: string; // Optional field
    target_date?: Date; // Optional field, can use `Date` for datetime
    status?: "Pending" | "Completed" | "In Progress"; // Optional with default "Pending", add more statuses as needed
    completed_date?: Date; // Optional field
}

export interface Reminder {
    id?: string; // Optional as it may be generated
    reminder_date: Date; // Required field
    message: string; // Required field
}
