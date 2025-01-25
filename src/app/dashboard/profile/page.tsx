"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase"
import { updateProfile, updateEmail } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

export default function ProfilePage() {
  const router = useRouter()
  const user = auth.currentUser
  const [name, setName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const previewSrc = photoFile ? URL.createObjectURL(photoFile) : user?.photoURL || "/avatars/default.png"
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (user) {
        await updateProfile(user, { displayName: name })
        await updateEmail(user, email)
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Update failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-sm shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={previewSrc} alt="Profile Preview" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPhotoFile(e.target.files[0])
                }
              }}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}