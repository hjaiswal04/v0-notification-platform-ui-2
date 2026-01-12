"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { mockCampaigns } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Loader2 } from "lucide-react"

export default function DownloadRecipientsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create mock CSV content
    const csvContent = `name,email,city
John Doe,john@example.com,Mumbai
Jane Smith,jane@example.com,Delhi
Rahul Kumar,rahul@example.com,Bangalore
Priya Sharma,priya@example.com,Chennai
Amit Patel,amit@example.com,Mumbai`

    // Trigger download
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `recipients-${selectedCampaign.replace(/\s+/g, "-").toLowerCase()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setIsDownloading(false)
  }

  const selectedCampaignData = mockCampaigns.find((c) => c.name === selectedCampaign)

  return (
    <DashboardLayout requiredRole="VIEWER">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Download Recipients</h1>
          <p className="text-muted-foreground mt-1">Export recipient lists for campaigns</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Select Campaign</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose a campaign to download its recipient list
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-card-foreground">Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {mockCampaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.name} className="text-popover-foreground">
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCampaignData && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">Campaign Details</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 text-foreground">{selectedCampaignData.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">City:</span>
                    <span className="ml-2 text-foreground">{selectedCampaignData.city}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recipients:</span>
                    <span className="ml-2 text-foreground">{selectedCampaignData.recipientCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className="ml-2 text-foreground">{selectedCampaignData.status}</span>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleDownload} disabled={!selectedCampaign || isDownloading}>
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
