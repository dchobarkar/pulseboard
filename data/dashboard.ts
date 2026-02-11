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

export const userGrowthData = [
  { month: "Jan", users: 8920 },
  { month: "Feb", users: 9450 },
  { month: "Mar", users: 10100 },
  { month: "Apr", users: 10820 },
  { month: "May", users: 11650 },
  { month: "Jun", users: 12450 },
];

export const funnelSteps = [
  { stage: "Visitors", count: 48500 },
  { stage: "Signups", count: 14200 },
  { stage: "Trials", count: 4200 },
  { stage: "Paid", count: 2890 },
];

export const retentionData = [
  { week: "Week 1", rate: 72 },
  { week: "Week 2", rate: 58 },
  { week: "Week 3", rate: 45 },
  { week: "Week 4", rate: 38 },
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
