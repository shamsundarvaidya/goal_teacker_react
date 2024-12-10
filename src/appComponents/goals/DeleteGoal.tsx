import { FC, useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Adjust path if needed
import { useRouter } from "@tanstack/react-router";
import { deleteGoal } from "@/lib/goalLib";
import { Button } from "@/components/ui/button";

type proptype = {
  goal_id: string;
};

const DeleteGoal: FC<proptype> = ({ goal_id }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const ondelete = async () => {
    const result = await deleteGoal(goal_id);
    if (result) {
      setMsg("Goal Deleted");
      setError("");
      setOpen(false);
      router.navigate({to:"/goals"})
    } else {
      setMsg("");
      setError("Failed to delete Goal");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon"><FaTrash color="red"/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delet Goal</DialogTitle>
          <DialogDescription>
            Are you sure to delete the goal?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-row justify-between w-full">
            <div>
              {error && <span className="text-sm text-red-500">{error}</span>}
              {msg && <span className="text-sm text-green-500">{msg}</span>}
            </div>
            <div className="space-x-1">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                No
              </Button>

              <Button type="button" onClick={ondelete}>
                Yes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default DeleteGoal;