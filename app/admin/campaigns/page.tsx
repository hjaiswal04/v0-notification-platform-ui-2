"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { mockCampaigns, type Campaign } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, Send, Trash2, Users } from "lucide-react"

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

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showRecipients, setShowRecipients] = useState(false)

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id))
  }

  const sendCampaign = (id: string) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status: "Active" as const } : c)))
  }

  return (
    <DashboardLayout requiredRole="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Manage all notification campaigns</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">All Campaigns</CardTitle>
            <CardDescription className="text-muted-foreground">{campaigns.length} total campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Campaign Name</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">City</TableHead>
                    <TableHead className="text-muted-foreground">Created By</TableHead>
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
                      <TableCell className="text-muted-foreground">{campaign.createdBy}</TableCell>
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
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCampaign(campaign)
                                setShowRecipients(true)
                              }}
                              className="text-popover-foreground"
                            >
                              <Users className="mr-2 h-4 w-4" />
                              View Recipients
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteCampaign(campaign.id)} className="text-destructive">
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
          </CardContent>
        </Card>

        {/* Recipients Dialog */}
        <Dialog open={showRecipients} onOpenChange={setShowRecipients}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">Campaign Recipients</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedCampaign?.name} - {selectedCampaign?.recipientCount} recipients
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {[
                "john@example.com",
                "jane@example.com",
                "rahul@example.com",
                "priya@example.com",
                "amit@example.com",
              ].map((email, idx) => (
                <div key={idx} className="p-2 rounded bg-muted text-sm text-foreground">
                  {email}
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
