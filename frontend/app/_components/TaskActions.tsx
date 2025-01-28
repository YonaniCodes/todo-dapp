import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddTaskDialogue from "./AddTaskDialogue";
import EditTaskDialogue from "./EditTaskDialogue";
import { useDeleteTask } from "../_lib/useDeleteTask";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { TaskType } from "../_lib/types/global";

type Props = {
  isHovered: boolean;
  task: TaskType;
};

export default function TaskActions({ isHovered, task }: Props) {
  const { deleteTask, isDeleting } = useDeleteTask();
  console.log(task, ",,,,,,,,,,,,,,,,,,,");
  const { status, id } = task;

  function handleDelete() {
    const task_id = id;

    deleteTask({ arg: [task_id] });
  }

  return (
    <span
      className={`flex flex-col space-y-2 ml-4  ${
        isHovered ? "" : "opacity-0"
      }`}
    >
      <AddTaskDialogue>
        <Button disabled={isDeleting} size="sm">
          <PlusIcon className="w-4 h-4" aria-hidden="true" /> {/* Add Icon */}
        </Button>
      </AddTaskDialogue>

      {status != "OVERDUE" && (
        <EditTaskDialogue task_id={id}>
          <Button disabled={isDeleting} variant="outline" size="sm">
            <PencilIcon className="w-4 h-4" aria-hidden="true" />{" "}
          </Button>
        </EditTaskDialogue>
      )}

      <DeleteConfirmationDialog onConfirm={handleDelete}>
        <Button disabled={isDeleting} variant="secondary" size="sm">
          <TrashIcon className="w-4 h-4" aria-hidden="true" />{" "}
          {/* Delete Icon */}
        </Button>
      </DeleteConfirmationDialog>
    </span>
  );
}
