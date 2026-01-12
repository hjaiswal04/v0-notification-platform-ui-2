export interface Campaign {
  id: string
  name: string
  type: "Offers" | "Order Updates" | "Newsletter"
  city: string
  createdBy: string
  status: "Draft" | "Active" | "Completed" | "Scheduled"
  recipientCount: number
  createdAt: string
}

export interface UserData {
  id: string
  name: string
  email: string
  role: "ADMIN" | "CREATOR" | "VIEWER" | "USER"
  city: string
  status: "Active" | "Inactive"
}

export interface NotificationLog {
  id: string
  campaignName: string
  type: string
  recipient: string
  status: "Sent" | "Failed" | "Pending"
  timestamp: string
}

export const mockUsers: UserData[] = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "ADMIN", city: "Mumbai", status: "Active" },
  { id: "2", name: "Creator User", email: "creator@example.com", role: "CREATOR", city: "Delhi", status: "Active" },
  { id: "3", name: "Viewer User", email: "viewer@example.com", role: "VIEWER", city: "Bangalore", status: "Active" },
  { id: "4", name: "John Doe", email: "user@example.com", role: "USER", city: "Chennai", status: "Active" },
  { id: "5", name: "Jane Smith", email: "jane@example.com", role: "USER", city: "Mumbai", status: "Active" },
  { id: "6", name: "Rahul Kumar", email: "rahul@example.com", role: "USER", city: "Delhi", status: "Inactive" },
  { id: "7", name: "Priya Sharma", email: "priya@example.com", role: "USER", city: "Bangalore", status: "Active" },
  { id: "8", name: "Amit Patel", email: "amit@example.com", role: "USER", city: "Chennai", status: "Active" },
]

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    type: "Offers",
    city: "All Cities",
    createdBy: "Creator User",
    status: "Active",
    recipientCount: 1250,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "New Arrivals Alert",
    type: "Newsletter",
    city: "Mumbai",
    createdBy: "Creator User",
    status: "Completed",
    recipientCount: 850,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Flash Sale Weekend",
    type: "Offers",
    city: "Delhi",
    createdBy: "Admin User",
    status: "Scheduled",
    recipientCount: 2100,
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    name: "Delivery Updates",
    type: "Order Updates",
    city: "All Cities",
    createdBy: "Creator User",
    status: "Active",
    recipientCount: 5000,
    createdAt: "2024-01-18",
  },
  {
    id: "5",
    name: "Monthly Newsletter",
    type: "Newsletter",
    city: "Bangalore",
    createdBy: "Admin User",
    status: "Draft",
    recipientCount: 0,
    createdAt: "2024-01-22",
  },
]

export const mockLogs: NotificationLog[] = [
  {
    id: "1",
    campaignName: "Summer Sale 2024",
    type: "Offers",
    recipient: "john@example.com",
    status: "Sent",
    timestamp: "2024-01-15 10:30:00",
  },
  {
    id: "2",
    campaignName: "Summer Sale 2024",
    type: "Offers",
    recipient: "jane@example.com",
    status: "Sent",
    timestamp: "2024-01-15 10:30:05",
  },
  {
    id: "3",
    campaignName: "New Arrivals Alert",
    type: "Newsletter",
    recipient: "rahul@example.com",
    status: "Failed",
    timestamp: "2024-01-10 14:20:00",
  },
  {
    id: "4",
    campaignName: "Delivery Updates",
    type: "Order Updates",
    recipient: "priya@example.com",
    status: "Sent",
    timestamp: "2024-01-18 09:00:00",
  },
  {
    id: "5",
    campaignName: "Flash Sale Weekend",
    type: "Offers",
    recipient: "amit@example.com",
    status: "Pending",
    timestamp: "2024-01-20 08:00:00",
  },
]
