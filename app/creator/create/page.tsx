"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Loader2 } from "lucide-react"

export default function CreateCampaignPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [created, setCreated] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsCreating(false)
    setCreated(true)
    setTimeout(() => {
      setCreated(false)
      setFormData({ name: "", type: "", city: "" })
    }, 2000)
  }

  return (
    <DashboardLayout requiredRole="CREATOR">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Campaign</h1>
          <p className="text-muted-foreground mt-1">Set up a new notification campaign</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Campaign Details</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details for your new campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-card-foreground">
                  Campaign Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter campaign name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-card-foreground">
                  Notification Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Offers" className="text-popover-foreground">
                      Offers
                    </SelectItem>
                    <SelectItem value="Order Updates" className="text-popover-foreground">
                      Order Updates
                    </SelectItem>
                    <SelectItem value="Newsletter" className="text-popover-foreground">
                      Newsletter
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-card-foreground">
                  City Filter
                </Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="All Cities" className="text-popover-foreground">
                      All Cities
                    </SelectItem>
                    <SelectItem value="Mumbai" className="text-popover-foreground">
                      Mumbai
                    </SelectItem>
                    <SelectItem value="Delhi" className="text-popover-foreground">
                      Delhi
                    </SelectItem>
                    <SelectItem value="Bangalore" className="text-popover-foreground">
                      Bangalore
                    </SelectItem>
                    <SelectItem value="Chennai" className="text-popover-foreground">
                      Chennai
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={isCreating || !formData.name || !formData.type || !formData.city}
                className="w-full sm:w-auto"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : created ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Created!
                  </>
                ) : (
                  "Create Campaign"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
