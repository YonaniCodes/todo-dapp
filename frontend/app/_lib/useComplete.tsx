import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { operation } from "../service/api";
import toast from "react-hot-toast";

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
      toast.success(`Task Updated!`);
    },
    onError: () => toast.error("Task Coudnt Updated!"),
  });

  return { isCompleting, completeTask, data };
}
