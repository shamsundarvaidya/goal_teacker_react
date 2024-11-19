export interface Goal {
    _id: string
    title: string
    description: string
    category: string
    status: string
    progress: number
    start_date: string
    end_date: string
    milestones: any[]
    reminders: any[]
    notes: any[]
  }