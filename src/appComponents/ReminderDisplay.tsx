import {FC} from 'react'
import type { Reminder } from '@/types/goal_types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
type proptype = {
    reminders:Reminder[]
}


const  ReminderDisplay:FC<proptype> = ({reminders})=>{


    return(
        <Card>
                        <CardHeader>
                            <CardTitle>Reminders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {reminders.length > 0 ? (
                                reminders.map((reminder) => (
                                    <div key={reminder.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                                        <p className="text-sm">
                                            <strong>Reminder Date:</strong> {new Date(reminder.reminder_date).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm">{reminder.message}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reminders set.</p>
                            )}
                        </CardContent>
                    </Card>
    );

}

export default ReminderDisplay;