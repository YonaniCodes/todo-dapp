"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSessionContext } from "./ContextProvider";
import useGetMe from "../_lib/useGetMe";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { session, login } = useSessionContext(); // Fetch session data

  return (
    <header className="border-b h-16 flex items-center justify-between px-6 fixed top-0 left-0 w-full bg-white z-10 shadow-md">
      <h1 className="text-2xl font-bold text-primary">Todo Dapp</h1>
      {!session && <Button onClick={login}>Connect wallet</Button>}
      {session && <UserSection />}
    </header>
  );
}

function UserSection() {
  const { user: name, isLoading } = useGetMe();
  if (isLoading) return;

  return (
    <div className="flex items-center space-x-4">
      <p className="text-gray-700 font-medium">Hello 👋👋👋, {name}</p>
      <Avatar>
        <AvatarImage src={"none" || undefined} alt={`${name}'s avatar`} />
        <AvatarFallback>
          {name?.charAt(0).toUpperCase() || "Yonani "}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
