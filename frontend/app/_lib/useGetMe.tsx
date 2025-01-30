import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { query } from "../_service/api";
import { TypePubkey } from "./types/global";

const useGetMe = () => {
  const { session } = useSessionContext();
  const user_id: TypePubkey = session?.account?.id;

  const queryArg = {
    user_id,
  };

  // Use the `useQuery` hook
  const {
    isLoading,
    data: user,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => query(session, queryArg, "get_me"),
    enabled: !!session, // Only run if user_id is available

    refetchOnWindowFocus: false, // Optional: prevent refetching when the window gains focus
  });

  return { user, isError, isLoading, refetch };
};

export default useGetMe;
