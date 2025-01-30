import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { operation } from "../service/api";

type argType = { arg: [Uint8Array]; name: "complete_task" | "uncomplete_task" };

export function useComplete() {
  const { session } = useSessionContext();
  const queryClient = useQueryClient(); // Corrected here

  const {
    isPending: isCompleting,
    mutate: completeTask,
    data,
  } = useMutation({
    mutationFn: ({ arg, name }: argType) => operation(session, arg, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Tasks"],
      });
    },
    onError: (err) => console.log(err),
  });

  return { isCompleting, completeTask, data };
}
