import { useMutation } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import { operation } from "../service/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// Define the shape of the arguments for the task creation
type argType = { arg: [string, string, number, Uint8Array] };

export function useEditTask() {
  const { session } = useSessionContext();
  const router = useRouter();
  const queryClient = useQueryClient(); // Corrected here
  const { isPending: isEditing, mutate: editTask } = useMutation({
    mutationFn: ({ arg }: argType) => operation(session, arg, "update_task"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Tasks"],
      });
      toast.success(`Task Updated!`);
      router.refresh();
    },
    onError: () => toast.error("Task should be at least 1 min a head."),
  });

  return { isEditing, editTask };
}
