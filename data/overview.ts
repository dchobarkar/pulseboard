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

// Filtered data sets for Overview page date ranges
export const overviewDataToday = {
  kpis: {
    revenue: { value: 1820, change: 2.2, label: "Revenue" },
    activeUsers: { value: 12495, change: 0.4, label: "Active Users" },
    conversionRate: { value: 3.28, change: 0.1, label: "Conversion Rate" },
    monthlyGrowth: { value: 8.7, change: 2.1, label: "Monthly Growth" },
  },
  revenueChart: [
    { month: "12am", revenue: 45 },
    { month: "4am", revenue: 38 },
    { month: "8am", revenue: 72 },
    { month: "12pm", revenue: 156 },
    { month: "4pm", revenue: 198 },
    { month: "8pm", revenue: 234 },
    { month: "Now", revenue: 1820 },
  ],
  trafficSources: [
    { name: "Organic", value: 45, color: "#22c55e" },
    { name: "Paid", value: 30, color: "#3b82f6" },
    { name: "Direct", value: 15, color: "#a855f7" },
    { name: "Referral", value: 10, color: "#f59e0b" },
  ],
  recentActivity: [
    { id: "1", user: "Alex Chen", action: "Upgraded to Pro", time: "2m ago" },
    { id: "2", user: "Sam Rivera", action: "New signup", time: "5m ago" },
    { id: "3", user: "Jordan Lee", action: "Export report", time: "12m ago" },
  ],
  topProducts: [
    { name: "API Pro", revenue: 520, units: 13 },
    { name: "Storage Pack", revenue: 380, units: 19 },
    { name: "Analytics Add-on", revenue: 320, units: 8 },
  ],
};

export const overviewDataWeek = {
  kpis: {
    revenue: { value: 12200, change: 5.8, label: "Revenue" },
    activeUsers: { value: 12450, change: 1.2, label: "Active Users" },
    conversionRate: { value: 3.35, change: 0.3, label: "Conversion Rate" },
    monthlyGrowth: { value: 8.7, change: 2.1, label: "Monthly Growth" },
  },
  revenueChart: [
    { month: "Mon", revenue: 1680 },
    { month: "Tue", revenue: 1750 },
    { month: "Wed", revenue: 1820 },
    { month: "Thu", revenue: 1890 },
    { month: "Fri", revenue: 1950 },
    { month: "Sat", revenue: 1620 },
    { month: "Sun", revenue: 1490 },
  ],
  trafficSources: [
    { name: "Organic", value: 43, color: "#22c55e" },
    { name: "Paid", value: 29, color: "#3b82f6" },
    { name: "Direct", value: 17, color: "#a855f7" },
    { name: "Referral", value: 11, color: "#f59e0b" },
  ],
  recentActivity: [
    { id: "1", user: "Alex Chen", action: "Upgraded to Pro", time: "2m ago" },
    { id: "2", user: "Sam Rivera", action: "New signup", time: "5m ago" },
    { id: "3", user: "Jordan Lee", action: "Export report", time: "12m ago" },
    {
      id: "4",
      user: "Casey Morgan",
      action: "Payment received",
      time: "1h ago",
    },
    {
      id: "5",
      user: "Riley Kim",
      action: "Cancelled subscription",
      time: "2h ago",
    },
    { id: "6", user: "Taylor Swift", action: "New signup", time: "3h ago" },
    {
      id: "7",
      user: "Morgan Freeman",
      action: "Upgraded to Enterprise",
      time: "5h ago",
    },
  ],
  topProducts: [
    { name: "API Pro", revenue: 3640, units: 91 },
    { name: "Storage Pack", revenue: 2660, units: 133 },
    { name: "Analytics Add-on", revenue: 2240, units: 56 },
    { name: "Support Tier", revenue: 1540, units: 31 },
  ],
};

export const overviewDataMonth = {
  kpis: {
    revenue: { value: 48240, change: 12.4, label: "Revenue" },
    activeUsers: { value: 12450, change: 18.2, label: "Active Users" },
    conversionRate: { value: 3.24, change: -0.8, label: "Conversion Rate" },
    monthlyGrowth: { value: 8.7, change: 2.1, label: "Monthly Growth" },
  },
  revenueChart: revenueChartData,
  trafficSources: trafficSources,
  recentActivity: recentActivity,
  topProducts: topProducts,
};

export const overviewDataLastMonth = {
  kpis: {
    revenue: { value: 42920, change: 8.1, label: "Revenue" },
    activeUsers: { value: 10530, change: 15.3, label: "Active Users" },
    conversionRate: { value: 3.32, change: -0.5, label: "Conversion Rate" },
    monthlyGrowth: { value: 6.5, change: 1.8, label: "Monthly Growth" },
  },
  revenueChart: [
    { month: "Week 1", revenue: 10200 },
    { month: "Week 2", revenue: 10800 },
    { month: "Week 3", revenue: 11200 },
    { month: "Week 4", revenue: 10720 },
  ],
  trafficSources: [
    { name: "Organic", value: 40, color: "#22c55e" },
    { name: "Paid", value: 30, color: "#3b82f6" },
    { name: "Direct", value: 20, color: "#a855f7" },
    { name: "Referral", value: 10, color: "#f59e0b" },
  ],
  recentActivity: [
    { id: "1", user: "Alex Chen", action: "Payment received", time: "1d ago" },
    { id: "2", user: "Sam Rivera", action: "New signup", time: "2d ago" },
    { id: "3", user: "Jordan Lee", action: "Export report", time: "3d ago" },
    {
      id: "4",
      user: "Casey Morgan",
      action: "Upgraded to Pro",
      time: "5d ago",
    },
    {
      id: "5",
      user: "Riley Kim",
      action: "Cancelled subscription",
      time: "1w ago",
    },
  ],
  topProducts: [
    { name: "API Pro", revenue: 11000, units: 275 },
    { name: "Storage Pack", revenue: 7900, units: 395 },
    { name: "Analytics Add-on", revenue: 6800, units: 170 },
    { name: "Support Tier", revenue: 4600, units: 92 },
    { name: "Integrations", revenue: 3620, units: 181 },
  ],
};

export const overviewDataQuarter = {
  kpis: {
    revenue: { value: 139340, change: 15.2, label: "Revenue" },
    activeUsers: { value: 12450, change: 18.2, label: "Active Users" },
    conversionRate: { value: 3.18, change: -1.2, label: "Conversion Rate" },
    monthlyGrowth: { value: 9.2, change: 2.5, label: "Monthly Growth" },
  },
  revenueChart: [
    { month: "Apr", revenue: 44100 },
    { month: "May", revenue: 46200 },
    { month: "Jun", revenue: 48240 },
  ],
  trafficSources: [
    { name: "Organic", value: 41, color: "#22c55e" },
    { name: "Paid", value: 29, color: "#3b82f6" },
    { name: "Direct", value: 19, color: "#a855f7" },
    { name: "Referral", value: 11, color: "#f59e0b" },
  ],
  recentActivity: [
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
    { id: "6", user: "Taylor Swift", action: "New signup", time: "2h ago" },
    {
      id: "7",
      user: "Morgan Freeman",
      action: "Upgraded to Enterprise",
      time: "1d ago",
    },
    {
      id: "8",
      user: "Emma Watson",
      action: "Payment received",
      time: "3d ago",
    },
  ],
  topProducts: [
    { name: "API Pro", revenue: 36200, units: 905 },
    { name: "Storage Pack", revenue: 26700, units: 1335 },
    { name: "Analytics Add-on", revenue: 22800, units: 570 },
    { name: "Support Tier", revenue: 15600, units: 312 },
    { name: "Integrations", revenue: 11820, units: 591 },
  ],
};
