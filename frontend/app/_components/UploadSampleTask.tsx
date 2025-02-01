const tasks = [
  {
    title: "Set Up Chromia Blockchain Environment",
    description:
      "Set up a local or testnet Chromia blockchain environment for development.",
  },
  {
    title: "Integrate Chromia Node API",
    description:
      "Integrate Chromia Node API to fetch dynamic data from the blockchain.",
  },
  {
    title: "Develop Smart Contracts for Chromia",
    description:
      "Create and deploy smart contracts on the Chromia blockchain to handle transactions.",
  },
  {
    title: "Optimize Blockchain Transaction Performance",
    description:
      "Analyze and optimize the performance of blockchain transactions on the Chromia network.",
  },
  {
    title: "Implement Chromia Wallet Integration",
    description:
      "Integrate a Chromia-compatible wallet for secure user transactions within the application.",
  },
];

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { operation } from "../service/api";
import { TypeSession } from "../_lib/types/global";

// Define the shape of the arguments for the task creation

export function useUploadTask() {
  const { session } = useSessionContext();
  const queryClient = useQueryClient();
  // Corrected here
  const { isPending: isCreating, mutate: createTasks } = useMutation({
    mutationFn: () => uploadTasks(session),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Tasks"],
      });
    },
    onError: (err) => console.log(err),
  });

  return { isCreating, createTasks };
}

async function uploadTasks(session: TypeSession) {
  for (const task of tasks) {
    const { title, description } = task;
    const due_date = addRandomTimeToTimestamp(new Date().getTime());

    const args = [due_date, title, description];
    await operation(session, args, "create_task"); // Await the operation for each task
  }

  return {
    data: "success",
  };
}

const addRandomTimeToTimestamp = (timestamp: number) => {
  const randomChoice = Math.floor(Math.random() * 3); // Randomly pick 0, 1, or 2
  const millisecondsInADay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const millisecondsInOneMinute = 60 * 1000; // Milliseconds in 3 minutes

  if (randomChoice === 0) {
    return timestamp + millisecondsInADay; // Add 1 day
  } else if (randomChoice === 1) {
    return timestamp + 2 * millisecondsInADay; // Add 2 days
  } else {
    return timestamp + millisecondsInOneMinute; // Add one Minute
  }
};
