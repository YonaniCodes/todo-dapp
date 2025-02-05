import { useMutation } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import { operation } from "../service/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define the shape of the arguments for the task creation
type TaskArgs = [number, string, string]; // [due_date (timestamp), title, description]

export function useCreateTask() {
  const router = useRouter();
  const { session } = useSessionContext();
  const queryClient = useQueryClient(); // Corrected here
  const { isPending: isCreating, mutate: createTask } = useMutation({
    mutationFn: (args: TaskArgs) => operation(session, args, "create_task"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Tasks"],
      });
      toast.success("Task Successfully created!");
      router.push(`/`);
    },
    onError: () => {
      toast.error("Task should be at least 1 min a head.");
    },
  });

  return { isCreating, createTask };
}
