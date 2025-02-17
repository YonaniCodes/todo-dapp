import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormElement from "./FormElement";
import useTasks from "../_lib/useTasks";
import { useEditTask } from "../_lib/useEditTask";
import { timestampToDatetimeLocal } from "../_lib/utils/date";

type TaskFormData = {
  title: string;
  description: string;
  due_date: string; // ISO format (YYYY-MM-DD)
};

export default function EditTaskForm({ task_id, editTask }: any) {
  const { tasks } = useTasks();

  const task = tasks?.find((task) => task.id === task_id);

  const { title, description, due_date } = task;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TaskFormData>({
    defaultValues: {
      title,
      description,
      due_date: timestampToDatetimeLocal(due_date),
    },
  });

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    const { title, description } = data;

    if (!data.due_date) {
      // Set a validation error for the due_date field
      setError("due_date", { message: "Due date is required" });
      return;
    }

    const due_date = new Date(data.due_date).getTime();
    console.log(data.due_date);
    const arg = [title, description, due_date, task_id];

    console.log("Updating task with args:", arg);

    // Call the editTask function with dynamic arguments
    editTask({ arg });
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Title Field */}
      <FormElement label="Title" errorMsg={errors?.title?.message}>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          className="border p-2 rounded"
          placeholder="Enter task title"
        />
      </FormElement>

      {/* Description Field */}
      <FormElement label="Description" errorMsg={errors?.description?.message}>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="border p-2 rounded"
          placeholder="Enter task description"
        />
      </FormElement>

      {/* Due Date Field */}
      <FormElement label="Due Date" errorMsg={errors?.due_date?.message}>
        <Input
          type="datetime-local"
          id="due_date"
          {...register("due_date", { required: "Due date is required" })}
          className="border p-2 rounded"
        />
      </FormElement>

      {/* Footer Buttons */}
      <DialogFooter className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Save Changes</Button>
      </DialogFooter>
    </form>
  );
}
