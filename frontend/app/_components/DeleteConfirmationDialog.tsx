import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDeleteTask } from "../_lib/useDeleteTask";

interface DeleteConfirmationDialogProps {
  children: React.ReactNode; // Type for children
  onConfirm: () => void; // Handler when the task is confirmed for deletion
}

export default function DeleteConfirmationDialog({
  children,
  onConfirm,
}: DeleteConfirmationDialogProps) {
  const { isDeleting } = useDeleteTask();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your task
            from the blockchain.
          </DialogDescription>
        </DialogHeader>
        {/* Action Buttons in Footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={isDeleting}
              variant="destructive"
              onClick={onConfirm}
            >
              {isDeleting ? "Deleting" : "Confirm"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
