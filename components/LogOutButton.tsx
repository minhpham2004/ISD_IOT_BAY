import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogOutButton = () => {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.clear();

    localStorage.removeItem("orderList");
    localStorage.setItem("firstLogin", false.toString());
    router.push("/sign-in");
    setTimeout(() => {
      toast.success("Log out successfully");
    }, 1);
  };

  return (
    <Button variant="destructive" onClick={handleLogOut}>
      Log out
    </Button>
  );
};
