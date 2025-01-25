"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const stats = [
    {
      title: "Total Users",
      value: "10.5k",
      icon: Icons.users,
      description: "Active users in your platform",
    },
    {
      title: "Revenue",
      value: "$45.2k",
      icon: Icons.dollar,
      description: "Monthly recurring revenue", 
    },
    {
      title: "Active Projects",
      value: "124",
      icon: Icons.folder,
      description: "Projects in progress",
    },
    {
      title: "Completion Rate",
      value: "95%",
      icon: Icons.chart,
      description: "Average project completion",
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {user?.displayName}</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}