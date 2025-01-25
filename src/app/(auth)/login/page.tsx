"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // next/router yerine next/navigation
import { auth, googleProvider, appleProvider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      router.push("/dashboard");
    } catch (err) {
      setError("Apple login failed. Please try again.");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.code === "auth/invalid-credentials" 
          ? "Invalid email or password"
          : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription>
          Login to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleEmailLogin} className="grid gap-4">
          <div className="grid gap-6">
            <Button 
              type="button"
              variant="outline" 
              onClick={handleGoogleLogin}
              className="form-shine"
              disabled={isLoading}
            >
              <Icons.google className="w-4 h-4 mr-2" />
              Login with Google
            </Button>
            
            <Button 
              type="button"
              variant="outline" 
              onClick={handleAppleLogin}
              className="form-shine"
              disabled={isLoading}
            >
              <Icons.apple className="w-4 h-4 mr-2" />
              Login with Apple
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="input-animated"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              className="input-animated"
              required
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link 
            href="/signup" 
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
