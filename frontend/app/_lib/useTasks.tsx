import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { useQueryParams } from "./useQueryParams";

type pubkeyType = Buffer<ArrayBufferLike> | undefined;

const useTasks = () => {
  const { session } = useSessionContext();
  const user_id: pubkeyType = session?.account?.id;
  const { getQueryParam } = useQueryParams();

  // Get the query parameters
  const sortBy = getQueryParam("sortBy") || "due_date_desc";
  const filterBy = getQueryParam("filterBy") || "all";

  // Create a unique query key that React Query can use to track changes
  const queryKey = ["Tasks", user_id, sortBy, filterBy];

  // Query function
  const fetchTasks = async () => {
    if (!session || !user_id) {
      throw new Error("Session or user_id is missing.");
    }

    const queryArgs = {
      user_id,
      task_sorting: sortBy.toUpperCase(),
      task_filtering: filterBy.toUpperCase(),
    };

    try {
      const res = await session.query({
        name: "get_tasks", // The name of the query you want to run
        args: queryArgs,
      });
      return res;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  // Use the `useQuery` hook
  const {
    isLoading,
    data: tasks,
    isError,
    refetch,
  } = useQuery({
    staleTime: 1000 * 60,
    queryKey,
    queryFn: fetchTasks,
    enabled: !!user_id, // Only run if user_id is available
    refetchOnWindowFocus: false, // Optional: prevent refetching when the window gains focus
  });

  return { tasks, isError, isLoading, refetch };
};

export default useTasks;
