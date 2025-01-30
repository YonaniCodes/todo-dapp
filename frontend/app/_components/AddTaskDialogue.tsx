import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "react-datepicker/dist/react-datepicker.css";
import AddTaskForm from "./AddTaskForm";
import { useCreateTask } from "../_lib/useCreateTask";

export default function AddTaskDialogue({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isCreating, createTask } = useCreateTask();

  console.log(typeof createTask);

  if (isCreating) return;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Fill in the details of the task.
          </DialogDescription>
        </DialogHeader>
        <AddTaskForm createTask={createTask} />
      </DialogContent>
    </Dialog>
  );
}
