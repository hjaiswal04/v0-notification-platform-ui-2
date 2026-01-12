"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { mockLogs } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const statusBadgeColors: Record<string, string> = {
  Sent: "bg-green-500/10 text-green-400 border-green-500/20",
  Failed: "bg-red-500/10 text-red-400 border-red-500/20",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
}

export default function AdminLogsPage() {
  return (
    <DashboardLayout requiredRole="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notification Logs</h1>
          <p className="text-muted-foreground mt-1">View all notification delivery logs</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Delivery Logs</CardTitle>
            <CardDescription className="text-muted-foreground">{mockLogs.length} log entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Campaign</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Recipient</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLogs.map((log) => (
                    <TableRow key={log.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{log.campaignName}</TableCell>
                      <TableCell className="text-muted-foreground">{log.type}</TableCell>
                      <TableCell className="text-muted-foreground">{log.recipient}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadgeColors[log.status]}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
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
