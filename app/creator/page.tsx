"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { mockCampaigns, type Campaign } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Send, Pencil, Trash2 } from "lucide-react"

const statusBadgeColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground border-border",
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Scheduled: "bg-amber-500/10 text-amber-400 border-amber-500/20",
}

const typeBadgeColors: Record<string, string> = {
  Offers: "bg-green-500/10 text-green-400 border-green-500/20",
  "Order Updates": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Newsletter: "bg-amber-500/10 text-amber-400 border-amber-500/20",
}

export default function CreatorCampaignsPage() {
  // Filter campaigns created by current user (Creator User)
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns.filter((c) => c.createdBy === "Creator User"))

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id))
  }

  const sendCampaign = (id: string) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status: "Active" as const } : c)))
  }

  return (
    <DashboardLayout requiredRole="CREATOR">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Campaigns</h1>
          <p className="text-muted-foreground mt-1">Manage campaigns you have created</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Your Campaigns</CardTitle>
            <CardDescription className="text-muted-foreground">
              {campaigns.length} campaigns created by you
            </CardDescription>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No campaigns yet. Create your first campaign!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Campaign Name</TableHead>
                      <TableHead className="text-muted-foreground">Type</TableHead>
                      <TableHead className="text-muted-foreground">City</TableHead>
                      <TableHead className="text-muted-foreground">Recipients</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="border-border">
                        <TableCell className="font-medium text-foreground">{campaign.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={typeBadgeColors[campaign.type]}>
                            {campaign.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{campaign.city}</TableCell>
                        <TableCell className="text-muted-foreground">{campaign.recipientCount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusBadgeColors[campaign.status]}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border">
                              <DropdownMenuItem
                                onClick={() => sendCampaign(campaign.id)}
                                disabled={campaign.status === "Active" || campaign.status === "Completed"}
                                className="text-popover-foreground"
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Send
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-popover-foreground">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteCampaign(campaign.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
