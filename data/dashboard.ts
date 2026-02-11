export const kpiOverview = {
  revenue: { value: 48240, change: 12.4, label: "Revenue" },
  activeUsers: { value: 12450, change: 18.2, label: "Active Users" },
  conversionRate: { value: 3.24, change: -0.8, label: "Conversion Rate" },
  monthlyGrowth: { value: 8.7, change: 2.1, label: "Monthly Growth" },
  mrr: { value: 38500, change: 5.2, label: "MRR" },
  churn: { value: 1.2, change: -0.3, label: "Churn %" },
};

export const revenueChartData = [
  { month: "Jan", revenue: 38200 },
  { month: "Feb", revenue: 40100 },
  { month: "Mar", revenue: 42500 },
  { month: "Apr", revenue: 44100 },
  { month: "May", revenue: 46200 },
  { month: "Jun", revenue: 48240 },
];

export const trafficSources = [
  { name: "Organic", value: 42, color: "#22c55e" },
  { name: "Paid", value: 28, color: "#3b82f6" },
  { name: "Direct", value: 18, color: "#a855f7" },
  { name: "Referral", value: 12, color: "#f59e0b" },
];

export const recentActivity = [
  { id: "1", user: "Alex Chen", action: "Upgraded to Pro", time: "2m ago" },
  { id: "2", user: "Sam Rivera", action: "New signup", time: "5m ago" },
  { id: "3", user: "Jordan Lee", action: "Export report", time: "12m ago" },
  {
    id: "4",
    user: "Casey Morgan",
    action: "Payment received",
    time: "18m ago",
  },
  {
    id: "5",
    user: "Riley Kim",
    action: "Cancelled subscription",
    time: "24m ago",
  },
];

export const topProducts = [
  { name: "API Pro", revenue: 12400, units: 310 },
  { name: "Storage Pack", revenue: 8900, units: 445 },
  { name: "Analytics Add-on", revenue: 7600, units: 190 },
  { name: "Support Tier", revenue: 5200, units: 104 },
  { name: "Integrations", revenue: 3940, units: 197 },
];

export const revenueVsExpenses = [
  { month: "Jan", revenue: 38200, expenses: 22100 },
  { month: "Feb", revenue: 40100, expenses: 23500 },
  { month: "Mar", revenue: 42500, expenses: 24800 },
  { month: "Apr", revenue: 44100, expenses: 25200 },
  { month: "May", revenue: 46200, expenses: 26100 },
  { month: "Jun", revenue: 48240, expenses: 26800 },
];

// Daily data for last 7 days
export const revenueVsExpenses7d = [
  { month: "Day 1", revenue: 1580, expenses: 920 },
  { month: "Day 2", revenue: 1620, expenses: 940 },
  { month: "Day 3", revenue: 1680, expenses: 980 },
  { month: "Day 4", revenue: 1710, expenses: 990 },
  { month: "Day 5", revenue: 1750, expenses: 1010 },
  { month: "Day 6", revenue: 1790, expenses: 1030 },
  { month: "Day 7", revenue: 1820, expenses: 1050 },
];

// Weekly data for last 30 days (4 weeks)
export const revenueVsExpenses30d = [
  { month: "Week 1", revenue: 11200, expenses: 6500 },
  { month: "Week 2", revenue: 11800, expenses: 6800 },
  { month: "Week 3", revenue: 12200, expenses: 7000 },
  { month: "Week 4", revenue: 12800, expenses: 7300 },
];

export const userGrowthData = [
  { month: "Jan", users: 8920 },
  { month: "Feb", users: 9450 },
  { month: "Mar", users: 10100 },
  { month: "Apr", users: 10820 },
  { month: "May", users: 11650 },
  { month: "Jun", users: 12450 },
];

// Daily user growth for last 7 days
export const userGrowthData7d = [
  { month: "Day 1", users: 12380 },
  { month: "Day 2", users: 12410 },
  { month: "Day 3", users: 12435 },
  { month: "Day 4", users: 12450 },
  { month: "Day 5", users: 12465 },
  { month: "Day 6", users: 12480 },
  { month: "Day 7", users: 12495 },
];

// Weekly user growth for last 30 days
export const userGrowthData30d = [
  { month: "Week 1", users: 12100 },
  { month: "Week 2", users: 12250 },
  { month: "Week 3", users: 12350 },
  { month: "Week 4", users: 12450 },
];

export const funnelSteps = [
  { stage: "Visitors", count: 48500 },
  { stage: "Signups", count: 14200 },
  { stage: "Trials", count: 4200 },
  { stage: "Paid", count: 2890 },
];

// Funnel data for different date ranges
export const funnelSteps7d = [
  { stage: "Visitors", count: 5600 },
  { stage: "Signups", count: 1680 },
  { stage: "Trials", count: 490 },
  { stage: "Paid", count: 340 },
];

export const funnelSteps30d = [
  { stage: "Visitors", count: 24200 },
  { stage: "Signups", count: 7100 },
  { stage: "Trials", count: 2100 },
  { stage: "Paid", count: 1450 },
];

export const retentionData = [
  { week: "Week 1", rate: 72 },
  { week: "Week 2", rate: 58 },
  { week: "Week 3", rate: 45 },
  { week: "Week 4", rate: 38 },
];

// Retention data for different ranges (same structure, different values)
export const retentionData7d = [
  { week: "Day 1-2", rate: 85 },
  { week: "Day 3-4", rate: 78 },
  { week: "Day 5-6", rate: 72 },
  { week: "Day 7", rate: 68 },
];

export const retentionData30d = [
  { week: "Week 1", rate: 75 },
  { week: "Week 2", rate: 62 },
  { week: "Week 3", rate: 52 },
  { week: "Week 4", rate: 45 },
];

export type UserRole = "admin" | "member" | "viewer" | "guest";
export type UserStatus = "active" | "inactive" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export const usersData: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Sam Rivera",
    email: "sam@company.io",
    role: "member",
    status: "active",
    createdAt: "2024-02-03",
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan@startup.co",
    role: "member",
    status: "pending",
    createdAt: "2024-02-10",
  },
  {
    id: "4",
    name: "Casey Morgan",
    email: "casey@example.com",
    role: "viewer",
    status: "active",
    createdAt: "2024-02-18",
  },
  {
    id: "5",
    name: "Riley Kim",
    email: "riley@company.io",
    role: "member",
    status: "inactive",
    createdAt: "2024-03-01",
  },
  {
    id: "6",
    name: "Taylor Brooks",
    email: "taylor@startup.co",
    role: "admin",
    status: "active",
    createdAt: "2024-03-12",
  },
  {
    id: "7",
    name: "Morgan Hayes",
    email: "morgan@example.com",
    role: "guest",
    status: "pending",
    createdAt: "2024-03-20",
  },
  {
    id: "8",
    name: "Jamie Fox",
    email: "jamie@company.io",
    role: "member",
    status: "active",
    createdAt: "2024-04-02",
  },
];

export const planDistribution = [
  { name: "Starter", value: 45, color: "#64748b" },
  { name: "Pro", value: 38, color: "#3b82f6" },
  { name: "Enterprise", value: 17, color: "#8b5cf6" },
];

export const mrrChartData = [
  { month: "Jan", mrr: 35200 },
  { month: "Feb", mrr: 36100 },
  { month: "Mar", mrr: 37200 },
  { month: "Apr", mrr: 37800 },
  { month: "May", mrr: 38200 },
  { month: "Jun", mrr: 38500 },
];

export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: InvoiceStatus;
}

export const invoicesData: Invoice[] = [
  {
    id: "INV-001",
    date: "2024-06-01",
    amount: 299,
    plan: "Pro",
    status: "paid",
  },
  {
    id: "INV-002",
    date: "2024-05-01",
    amount: 299,
    plan: "Pro",
    status: "paid",
  },
  {
    id: "INV-003",
    date: "2024-04-01",
    amount: 99,
    plan: "Starter",
    status: "paid",
  },
  {
    id: "INV-004",
    date: "2024-07-01",
    amount: 299,
    plan: "Pro",
    status: "pending",
  },
  {
    id: "INV-005",
    date: "2024-03-15",
    amount: 899,
    plan: "Enterprise",
    status: "overdue",
  },
];

export interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  status: "ready" | "generating" | "failed";
}

export const reportsData: Report[] = [
  {
    id: "1",
    name: "Monthly Revenue Summary",
    type: "CSV",
    date: "2024-06-01",
    status: "ready",
  },
  {
    id: "2",
    name: "User Acquisition Report",
    type: "CSV",
    date: "2024-05-28",
    status: "ready",
  },
  {
    id: "3",
    name: "Churn Analysis",
    type: "CSV",
    date: "2024-05-15",
    status: "ready",
  },
  {
    id: "4",
    name: "Q2 Analytics Export",
    type: "CSV",
    date: "2024-06-30",
    status: "generating",
  },
  {
    id: "5",
    name: "Billing Overview",
    type: "CSV",
    date: "2024-06-10",
    status: "failed",
  },
];

// Notifications
export interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "payment" | "user" | "report" | "growth";
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

export const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Payment Received",
    message: "Invoice INV-001 for $299 has been paid successfully",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "user",
    title: "New User Signup",
    message: "Sam Rivera has joined your workspace",
    time: "15m ago",
    read: false,
  },
  {
    id: "3",
    type: "growth",
    title: "Revenue Milestone",
    message: "Monthly revenue exceeded $48,000",
    time: "1h ago",
    read: false,
  },
  {
    id: "4",
    type: "report",
    title: "Report Ready",
    message: "Monthly Revenue Summary is ready for download",
    time: "2h ago",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Payment Overdue",
    message: "Invoice INV-005 for $899 is overdue",
    time: "3h ago",
    read: false,
  },
  {
    id: "6",
    type: "success",
    title: "System Update",
    message: "Dashboard has been updated with new features",
    time: "5h ago",
    read: true,
  },
];
