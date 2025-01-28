export type TaskType = {
  id: Uint8Array; // Public key as Uint8Array
  title: string;
  due_date: number;
  status: StatusType;
  color: string;
  description: string;
};

type StatusType = "COMPLETED" | "PENDING" | "OVERDUE";
