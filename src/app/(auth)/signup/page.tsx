"use client";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { auth, googleProvider, appleProvider } from "@/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

function handleGoogleSignUp() {
  const router = useRouter();
  signInWithPopup(auth, googleProvider)
    .then(() => {
      router.push("/dashboard");
    })
    .catch((err) => {
      // handle error
    });
}

function handleAppleSignUp() {
  const router = useRouter();
  signInWithPopup(auth, appleProvider)
    .then(() => {
      router.push("/dashboard");
    })
    .catch((err) => {
      // handle error
    });
}

function handleEmailSignUp(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const router = useRouter();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.push("/dashboard");
    })
    .catch((err) => {
      // handle error
    });
}

export default function SignUpForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Create an account using OAuth or your email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSignUp} className="grid gap-4">
          {/* OAuth signup buttons */}
          <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
            <Icons.google className="w-4 h-4 mr-2" />
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={handleAppleSignUp}>
            <Icons.apple className="w-4 h-4 mr-2" />
            Sign up with Apple
          </Button>
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {/* Sign up form */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}