import { FC, useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Adjust path if needed
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { Note } from "@/types/notes_types";
import { updateNote } from "@/lib/notesLib";
import { useRouter } from "@tanstack/react-router";
import { formatDate } from "@/lib/dateLib";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  FaPen } from "react-icons/fa";
import { Goal } from "@/types/goal_types";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

interface GoalEditDialogProps {
  goal: Goal;

}

const formSchema = z.object({
    title: z.string().min(2,{message: "Username must be at least 2 characters."}),
    description: z.string(),
    category: z.string(),
    status: z.string(),
    start_date: z.string(),
    end_date: z.string(),
});

export const GoalEditDialog: FC<GoalEditDialogProps> = ({ goal }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:goal.title,
            description:goal.description
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }


  const [open, setOpen] = useState(false);

  const router = useRouter();


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon"><FaPen color="blue" /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="goal title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="goal description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  );
};
