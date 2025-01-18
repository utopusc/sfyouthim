"use client";
import Link from "next/link";
import { useRouter } from "next/router";
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

function handleGoogleLogin() {
  const router = useRouter();
  signInWithPopup(auth, googleProvider)
    .then(() => {
      router.push("/dashboard");
    })
    .catch((err) => {
      // handle error
    });
}

function handleAppleLogin() {
  const router = useRouter();
  signInWithPopup(auth, appleProvider)
    .then(() => {
      router.push("/dashboard");
    })
    .catch((err) => {
      // handle error
    });
}

function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const router = useRouter();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.push("/dashboard");
    })
    .catch((err) => {
      // handle error
    });
}

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailLogin} className="grid gap-4">
          <Button onClick={handleGoogleLogin} className="w-full">
            Login with Google
          </Button>
          <Button onClick={handleAppleLogin} className="w-full">
            Login with Apple
          </Button>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
