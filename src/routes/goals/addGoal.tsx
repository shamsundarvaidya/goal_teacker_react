import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Goal } from '@/types/goal_types.ts'
import GoalForm from "@/appComponents/GoalForm.tsx";

export const Route = createFileRoute('/goals/addGoal')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <GoalForm />
  );
}

