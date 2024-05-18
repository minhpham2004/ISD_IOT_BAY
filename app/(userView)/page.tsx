"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const firstLoginString = localStorage.getItem("firstLogin");
  const firstLogin = Boolean(firstLoginString);

  useEffect(() => {
    if (!firstLogin) {
      router.push("/sign-in");
    }
    else {
      router.push("/Home");
    }
  }, []);
}
