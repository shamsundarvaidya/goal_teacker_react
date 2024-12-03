export type Note {
    id: string; // Optional unique identifier
    note_date: string; // ISO 8601 string for the date
    content: string; // Content of the note
}


export type notePayload = {
    goal_id:string,
    note_date:string,
    content:string
}

