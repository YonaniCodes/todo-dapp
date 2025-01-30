import { useMutation } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import { operation } from "../_service/api";
import { useRouter } from "next/navigation";
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
      router.refresh();
    },
    onError: (err) => console.log(err),
  });

  return { isEditing, editTask };
}
