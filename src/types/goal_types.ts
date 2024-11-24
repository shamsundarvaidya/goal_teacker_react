export interface Goal {
    _id: string
    title: string
    description: string
    category: string
    status: string
    progress: number
    start_date: string
    end_date: string
    milestones: string[]
    reminders: string[]
    notes: Note[]
  }

  export interface Note {
      id: string; // Optional unique identifier
      note_date: string; // ISO 8601 string for the date
      content: string; // Content of the note
  }
