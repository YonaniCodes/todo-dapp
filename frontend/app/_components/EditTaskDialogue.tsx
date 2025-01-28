import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react-datepicker/dist/react-datepicker.css";
import EditTaskForm from "./EditTaskForm";

type EditTaskDialogueProps = {
  children: React.ReactElement;
  task_id: Uint8Array; // Pass the task_id as a string
};

export default function EditTaskDialogue({
  children,
  task_id,
}: EditTaskDialogueProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Fill in the details of the task.
          </DialogDescription>
        </DialogHeader>
        {/* Pass task_id to the form */}
        <EditTaskForm task_id={task_id} />
      </DialogContent>
    </Dialog>
  );
}
