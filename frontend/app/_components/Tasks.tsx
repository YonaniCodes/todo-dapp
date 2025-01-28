import { useState } from "react";
import useTasks from "../_lib/useTasks";
import TaskActions from "./TaskActions";
import TaskCard from "./TaskCard";
import { Card, CardContent } from "@/components/ui/card";
import { TaskType } from "../_lib/types/global";

export type StatusType = "PENDING" | "COMPLETED" | "OVERDUE";

export default function Tasks() {
  const { tasks, isError, isLoading } = useTasks();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error...</>;
  if (tasks?.length == 0)
    return (
      <div className="flex justify-center items-center mt-[120px]">
        <Card className="w-1/2">
          <CardContent className="text-center p-6">
            No tasks found. Please change the filter.
          </CardContent>
        </Card>
      </div>
    );
  return (
    <>
      {tasks?.map((task: TaskType, index: number) => (
        <TaskHover key={index} task={task} />
      ))}
    </>
  );
}

function TaskHover({ task }: { task: TaskType }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex gap-4 mb-4"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
      onMouseLeave={() => setIsHovered(false)}
    >
      <TaskActions id={task.id} task={task} isHovered={isHovered} />
      <div className="flex-1">
        <TaskCard task={task} />
      </div>
    </div>
  );
}
