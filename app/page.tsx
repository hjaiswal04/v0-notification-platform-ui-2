"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Bell, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      // Get user role and redirect
      const roleRoutes: Record<string, string> = {
        ADMIN: "/admin",
        CREATOR: "/creator",
        VIEWER: "/viewer",
        USER: "/user",
      }
      const user = await fetch("/api/user").catch(() => null)
      // For demo, we'll get the role from the mock
      const mockRoles: Record<string, string> = {
        "admin@example.com": "ADMIN",
        "creator@example.com": "CREATOR",
        "viewer@example.com": "VIEWER",
        "user@example.com": "USER",
      }
      const role = mockRoles[email.toLowerCase()] || "USER"
      router.push(roleRoutes[role])
    } else {
      setError("Invalid email or password")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 bg-primary rounded-lg">
            <Bell className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">NotifyHub</h1>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-card-foreground">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Demo accounts:</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  <span className="text-primary font-medium">Admin:</span> admin@example.com
                  <br />
                  <span className="text-muted-foreground/70 ml-2">Pass: Admin@Notify2024!</span>
                </p>
                <p>
                  <span className="text-primary font-medium">Creator:</span> creator@example.com
                  <br />
                  <span className="text-muted-foreground/70 ml-2">Pass: Creator@Notify2024!</span>
                </p>
                <p>
                  <span className="text-primary font-medium">Viewer:</span> viewer@example.com
                  <br />
                  <span className="text-muted-foreground/70 ml-2">Pass: Viewer@Notify2024!</span>
                </p>
                <p>
                  <span className="text-primary font-medium">User:</span> user@example.com
                  <br />
                  <span className="text-muted-foreground/70 ml-2">Pass: User@Notify2024!</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
