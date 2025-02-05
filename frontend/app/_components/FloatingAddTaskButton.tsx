import { Button } from "@/components/ui/button";
import AddTaskDialogue from "./AddTaskDialogue";
import { PlusIcon } from "@heroicons/react/24/outline";
export default function FloatingAddTaskButton() {
  return (
    <div
      style={{
        position: "fixed", // Fix the button to the viewport
        bottom: "40px", // Position 20px from the bottom
        left: "40px", // Position 20px from the left
        zIndex: 1000, // Ensure the button is above other content
      }}
    >
      <AddTaskDialogue>
        <Button size="default" title="Add Task">
          <PlusIcon className="w-4 h-4" aria-hidden="true" /> {/* Add Icon */}
        </Button>
      </AddTaskDialogue>
    </div>
  );
}
