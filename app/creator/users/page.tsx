"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Loader2, Upload } from "lucide-react"

export default function CreateUsersPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [created, setCreated] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    city: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsCreating(false)
    setCreated(true)
    setTimeout(() => {
      setCreated(false)
      setFormData({ name: "", email: "", role: "", city: "" })
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

  return (
    <DashboardLayout requiredRole="CREATOR">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Users</h1>
          <p className="text-muted-foreground mt-1">Add new Creator or Viewer users</p>
        </div>

        {/* Manual User Creation */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Add User Manually</CardTitle>
            <CardDescription className="text-muted-foreground">Create a single user account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-card-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-card-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-card-foreground">
                    Role
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="CREATOR" className="text-popover-foreground">
                        Creator
                      </SelectItem>
                      <SelectItem value="VIEWER" className="text-popover-foreground">
                        Viewer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-card-foreground">
                    City
                  </Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
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
              </div>

              <Button
                type="submit"
                disabled={isCreating || !formData.name || !formData.email || !formData.role || !formData.city}
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
                  "Create User"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CSV Upload */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Bulk Upload via CSV</CardTitle>
            <CardDescription className="text-muted-foreground">
              Upload a CSV file with columns: name, email, role, city
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-muted-foreground transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {uploadedFile ? (
                    <span className="text-foreground">{uploadedFile}</span>
                  ) : (
                    <>
                      Click to upload or drag and drop
                      <br />
                      <span className="text-xs">CSV files only</span>
                    </>
                  )}
                </p>
                <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
              </div>

              <Button disabled={!uploadedFile} className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" />
                Upload Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
