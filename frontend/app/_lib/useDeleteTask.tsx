import { useMutation } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import { operation } from "../service/api";
// Define the shape of the arguments for the task creation
type argType = { arg: [Uint8Array] };

export function useDeleteTask() {
  const session = useSessionContext();
  const queryClient = useQueryClient(); // Corrected here
  const { isPending: isDeleting, mutate: deleteTask } = useMutation({
    mutationFn: ({ arg }: argType) => operation(session, arg, "delete_task"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Tasks"],
      });
    },
    onError: (err) => console.log(err),
  });

  return { isDeleting, deleteTask };
}
