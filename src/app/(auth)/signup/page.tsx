"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // next/router yerine next/navigation
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
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err) {
      setError("Google sign up failed. Please try again.");
    }
  };

  const handleAppleSignUp = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      router.push("/dashboard");
    } catch (err) {
      setError("Apple sign up failed. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Add display name
      await updateProfile(user, {
        displayName: formData.name
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <CardDescription>
          Create an account using OAuth or your email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
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
            <Input 
              id="name" 
              type="text" 
              placeholder="Your name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
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
