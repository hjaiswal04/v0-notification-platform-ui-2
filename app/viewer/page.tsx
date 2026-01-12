"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { mockCampaigns } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

export default function ViewerCampaignsPage() {
  return (
    <DashboardLayout requiredRole="VIEWER">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">View all notification campaigns</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">All Campaigns</CardTitle>
            <CardDescription className="text-muted-foreground">{mockCampaigns.length} total campaigns</CardDescription>
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
                    <TableHead className="text-muted-foreground">Recipients</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => (
                    <TableRow key={campaign.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={typeBadgeColors[campaign.type]}>
                          {campaign.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{campaign.city}</TableCell>
                      <TableCell className="text-muted-foreground">{campaign.createdBy}</TableCell>
                      <TableCell className="text-muted-foreground">{campaign.recipientCount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadgeColors[campaign.status]}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{campaign.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
