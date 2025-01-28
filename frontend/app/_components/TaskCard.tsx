import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useComplete } from "../_lib/useComplete";

import { XIcon } from "lucide-react";
import { formatTimestampToDay } from "../_lib/utils/date";
import { TaskType } from "../_lib/types/global";

type TaskProp = {
  task: TaskType;
};

type StatusType = "COMPLETED" | "PENDING" | "OVERDUE";

export default function TaskCard({ task }: TaskProp) {
  const { completeTask, isCompleting } = useComplete();

  function handleClick() {
    if (isCompleting || task.status === "OVERDUE") return; // Prevent action if completing or overdue
    const name =
      task.status === "PENDING" ? "complete_task" : "uncomplete_task";
    const arg = [task.id];

    completeTask({ arg, name });
  }

  return (
    <Card className="p-4">
      {/* Main Task Details */}
      <CardContent className="flex items-center space-x-4">
        {/* Conditional Rendering of Checkbox or X Icon */}
        {task.status === "OVERDUE" ? (
          <XIcon className="h-5 w-5 text-red-500" />
        ) : (
          <Checkbox
            checked={task.status === "COMPLETED"}
            disabled={isCompleting}
            onClick={handleClick}
          />
        )}

        <div className="flex-1">
          {/* Task Title and Status */}
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">{task.title}</h3>
            <Badge className={`${getBadgeClass(task.status)} flex-shrink-0`}>
              {task.status}
            </Badge>
          </div>
          {/* Task Description and Due Date */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-600 flex-1 truncate">
              {task.description}
            </p>
            <p className="text-xs text-gray-500 ml-4 whitespace-nowrap">
              {formatTimestampToDay(task.due_date)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getBadgeClass(status: StatusType): string {
  const badgeClasses = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING: "bg-blue-100 text-blue-700",
    OVERDUE: "bg-red-100 text-red-700",
  };
  return badgeClasses[status] || "bg-gray-100 text-gray-700";
}
