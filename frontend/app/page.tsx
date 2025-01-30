"use client";
import ConnectWallet from "./_components/ConnectWallet";
import { useSessionContext } from "./_components/ContextProvider";
import NoTaskCreated from "./_components/NoTaskCreated";
import SortFilterMenue from "./_components/SortFilterMenue";
import Tasks from "./_components/Tasks";
import { useQueryParams } from "./_lib/useQueryParams";
import useTasks from "./_lib/useTasks";

export default function Home() {
  const { session } = useSessionContext();
  const { tasks } = useTasks();
  const { getQueryParam } = useQueryParams();
  const filter = getQueryParam("filterBy");

  if (!session) {
    return <ConnectWallet />;
  }

  console.log(session);
  if (tasks?.length == 0 && (filter == "all" || filter == null))
    return <NoTaskCreated />;
  return (
    <div>
      <div className="w-[800px] mx-auto mt-[100px]">
        <SortFilterMenue />
        <Tasks />
      </div>
    </div>
  );
}
