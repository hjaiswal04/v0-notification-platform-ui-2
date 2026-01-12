"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Check, Loader2 } from "lucide-react"

export default function UserPreferencesPage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [preferences, setPreferences] = useState({
    offers: user?.preferences.offers ?? true,
    orderUpdates: user?.preferences.orderUpdates ?? true,
    newsletter: user?.preferences.newsletter ?? false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout requiredRole="USER">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile & Preferences</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and notification preferences</p>
        </div>

        {/* Profile Info */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Profile Information</CardTitle>
            <CardDescription className="text-muted-foreground">Your basic account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-card-foreground">Name</Label>
                <Input value={user?.name || ""} disabled className="bg-muted border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-card-foreground">Email</Label>
                <Input value={user?.email || ""} disabled className="bg-muted border-border text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-card-foreground">City</Label>
              <Input value={user?.city || ""} disabled className="bg-muted border-border text-foreground md:w-1/2" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Notification Preferences</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Offers</Label>
                <p className="text-sm text-muted-foreground">Receive promotional offers and discounts</p>
              </div>
              <Switch
                checked={preferences.offers}
                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, offers: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Order Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about your order status</p>
              </div>
              <Switch
                checked={preferences.orderUpdates}
                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, orderUpdates: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-card-foreground">Newsletter</Label>
                <p className="text-sm text-muted-foreground">Weekly updates on new products and features</p>
              </div>
              <Switch
                checked={preferences.newsletter}
                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, newsletter: checked }))}
              />
            </div>

            <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved!
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
