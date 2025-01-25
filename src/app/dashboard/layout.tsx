"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { auth } from "@/firebase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState(() => {
    const current = auth.currentUser;
    return {
      name: current?.displayName || "John Doe",
      email: current?.email || "john@example.com",
    };
  });

  const menuItems = [
    { icon: Icons.home, label: "Dashboard", href: "/dashboard" },
    { icon: Icons.users, label: "Users", href: "/dashboard/users" },
    { icon: Icons.settings, label: "Settings", href: "/dashboard/settings" },
    { icon: Icons.help, label: "Help", href: "/dashboard/help" },
  ];

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleChangeName = () => {
    const newName = prompt("Enter a new name", user.name);
    if (newName) {
      setUser((prev) => ({ ...prev, name: newName }));
      // Optionally update Firebase: current?.updateProfile({ displayName: newName })
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex h-full flex-col border-r bg-card px-3 py-4">
          {/* Logo */}
          <div className="mb-8 flex items-center px-2">
            <Icons.logo className="h-6 w-6" />
            <span className="ml-2 text-lg font-semibold">SFYI</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? "ml-64" : "ml-0"} min-h-screen`}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Icons.menu className="h-5 w-5" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="Profile" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => router.push("/dashboard/profile")}>
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
