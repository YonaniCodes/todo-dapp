import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormElement from "./FormElement";

import { Textarea } from "@/components/ui/textarea";

// Define the type for form data
interface TaskFormData {
  title: string;
  description: string;
  due_date: string | number; // ISO format (YYYY-MM-DD)
}

// Define props for the FormElement component

export default function AddTaskForm({ createTask }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>(); // Use the TaskFormData type for form data

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    const { title, description } = data;
    const due_date = new Date(data.due_date).getTime();
    console.log(data.due_date);
    const args = [due_date, title, description];
    createTask(args);
  };

  return (
    <form className="grid gap-4 py-4">
      {/* Title Field */}
      <FormElement label="Title" errorMsg={errors?.title?.message}>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          className="border p-2 rounded"
          placeholder="Enter task title"
        />
      </FormElement>

      {/* Description Field - Using ShadCN Textarea */}
      <FormElement label="Description" errorMsg={errors?.description?.message}>
        <Textarea
          id="description"
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 60,
              message: "Description must be less than 60 characters",
            },
          })}
          className="p-2 rounded text-xs" // Set font size to 12px
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
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Add Task
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
