// app/components/NotFound.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-lg text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button
        onClick={goHome}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
