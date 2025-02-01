import { Session } from "@chromia/ft4";

export type TaskType = {
  id: Uint8Array; // Public key as Uint8Array
  title: string;
  due_date: number;
  status: StatusType;
  color: string;
  description: string;
};
export type TypePubkey = Uint8Array<ArrayBufferLike> | undefined;
export type TypePubkey = Uint8Array<ArrayBufferLike> | undefined;
type TypeStatus = "COMPLETED" | "PENDING" | "OVERDUE";
export type TypeSession = Session | undefined;
export type editargType = { arg: [string, string, number, Uint8Array] };
