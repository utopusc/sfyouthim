"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="p-4 text-center">
      <h1 className="text-xl font-bold">Welcome to your Dashboard</h1>
      <button 
        onClick={() => auth.signOut()} 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
    </main>
  );
}