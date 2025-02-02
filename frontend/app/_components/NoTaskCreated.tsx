import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUploadTask } from "./UploadSampleTask";

export default function NoTaskCreated() {
  const { isCreating, createTasks } = useUploadTask();

  function handlCreateTasks() {
    console.log("tasks");
    createTasks();
  }
  return (
    <Card className="w-[400px] p-6 mx-auto mt-[200px]">
      <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">
            No Tasks Found
          </h3>
          <p className="text-sm text-gray-500">
            It looks like you don&apos;t have any tasks yet. You can create 5
            new tasks to get started.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-4">
          <Button
            disabled={isCreating}
            onClick={handlCreateTasks}
            className="flex items-center space-x-2"
          >
            {/* <UploadIcon className="h-4 w-4" /> */}
            {isCreating ? "Creating..." : "Upload 5 Sample Tasks"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
