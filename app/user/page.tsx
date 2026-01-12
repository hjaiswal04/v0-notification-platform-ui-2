"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Tag, Newspaper } from "lucide-react"

export default function UserHomePage() {
  const { user } = useAuth()

  const notificationCards = [
    {
      title: "Order Updates",
      description: "Track your orders in real-time",
      icon: <Package className="h-8 w-8" />,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      title: "Offers",
      description: "Exclusive deals and discounts",
      icon: <Tag className="h-8 w-8" />,
      color: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    {
      title: "Newsletter",
      description: "Latest news and product launches",
      icon: <Newspaper className="h-8 w-8" />,
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
  ]

  return (
    <DashboardLayout requiredRole="USER">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]}!</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your personalized notifications and preferences.
          </p>
        </div>

        {/* Notification Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {notificationCards.map((card) => (
            <Card
              key={card.title}
              className={`border bg-card hover:bg-muted/50 transition-colors cursor-default ${card.color.split(" ")[2]}`}
            >
              <CardHeader className="pb-2">
                <div className={`p-3 rounded-lg w-fit ${card.color.split(" ").slice(0, 2).join(" ")}`}>{card.icon}</div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg text-card-foreground">{card.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-1">{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Notifications</CardTitle>
            <CardDescription className="text-muted-foreground">Your latest updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Order Update", message: "Your order #12345 has been shipped", time: "2 hours ago" },
                { type: "Offer", message: "Flash sale: 50% off on electronics", time: "1 day ago" },
                { type: "Newsletter", message: "New arrivals this week", time: "3 days ago" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.type}</p>
                    <p className="text-sm text-muted-foreground">{item.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
