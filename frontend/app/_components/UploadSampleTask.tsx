const tasks = [
  {
    title: "Set Up Authentication",
    description: "Implement user authentication with FT4.",
  },
  {
    title: "Create a Navigation Bar",
    description: "Design a responsive navbar using shadcn/ui.",
  },
  {
    title: "Build Profile Page",
    description: "Create a profile page for users to edit details.",
  },
  {
    title: "Add Dark Mode",
    description: "Implement dark mode toggle using Tailwind CSS.",
  },
  {
    title: "Create Todo List",
    description: "Allow users to manage tasks in a to-do list.",
  },
  {
    title: "Set Up Block chain ApI",
    description: "Integrate an the blockchain API to fetch dynamic data.",
  },
  {
    title: "Optimize Performance",
    description: "Analyze and optimize app performance for speed.",
  },
  {
    title: "Add Notification System",
    description: "Notify users of important actions and updates.",
  },
  {
    title: "Create Settings Page",
    description: "Build a settings page for user preferences.",
  },
  {
    title: "Deploy the Application",
    description: "Deploy app to production using Vercel or AWS.",
  },
];

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSessionContext } from "../_components/ContextProvider";
import { operation } from "../service/api";

// Define the shape of the arguments for the task creation

export function useUploadTask() {
  const session = useSessionContext();
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

async function uploadTasks(session) {
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
  const millisecondsInThreeMinutes = 3 * 60 * 1000; // Milliseconds in 3 minutes

  if (randomChoice === 0) {
    return timestamp + millisecondsInADay; // Add 1 day
  } else if (randomChoice === 1) {
    return timestamp + 2 * millisecondsInADay; // Add 2 days
  } else {
    return timestamp + millisecondsInThreeMinutes; // Add 3 minutes
  }
};
