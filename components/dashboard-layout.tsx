"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Home,
  Settings,
  Users,
  Megaphone,
  FileText,
  PlusCircle,
  Download,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  USER: [
    { label: "Home", href: "/user", icon: <Home className="h-4 w-4" /> },
    { label: "Profile & Preferences", href: "/user/preferences", icon: <Settings className="h-4 w-4" /> },
  ],
  ADMIN: [
    { label: "Users", href: "/admin", icon: <Users className="h-4 w-4" /> },
    { label: "Campaigns", href: "/admin/campaigns", icon: <Megaphone className="h-4 w-4" /> },
    { label: "Logs", href: "/admin/logs", icon: <FileText className="h-4 w-4" /> },
  ],
  CREATOR: [
    { label: "My Campaigns", href: "/creator", icon: <Megaphone className="h-4 w-4" /> },
    { label: "Create Campaign", href: "/creator/create", icon: <PlusCircle className="h-4 w-4" /> },
    { label: "Create Users", href: "/creator/users", icon: <UserPlus className="h-4 w-4" /> },
  ],
  VIEWER: [
    { label: "Campaigns", href: "/viewer", icon: <Megaphone className="h-4 w-4" /> },
    { label: "Download Recipients", href: "/viewer/download", icon: <Download className="h-4 w-4" /> },
  ],
}

export function DashboardLayout({
  children,
  requiredRole,
}: {
  children: React.ReactNode
  requiredRole: UserRole
}) {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    } else if (user?.role !== requiredRole) {
      const roleRoutes: Record<UserRole, string> = {
        ADMIN: "/admin",
        CREATOR: "/creator",
        VIEWER: "/viewer",
        USER: "/user",
      }
      router.push(roleRoutes[user?.role || "USER"])
    }
  }, [isAuthenticated, user, requiredRole, router])

  if (!isAuthenticated || user?.role !== requiredRole) {
    return null
  }

  const navItems = roleNavItems[user.role]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-card">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary rounded-lg">
              <Bell className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">NotifyHub</span>
            <span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">{user.role}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground hidden sm:inline">{user.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
              <DropdownMenuItem className="text-popover-foreground">
                <User className="mr-2 h-4 w-4" />
                {user.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-56 border-r border-border bg-card hidden md:block">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
          <nav className="flex justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.icon}
                <span className="truncate max-w-[60px]">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 pb-20 md:pb-6">{children}</main>
      </div>
    </div>
  )
}
