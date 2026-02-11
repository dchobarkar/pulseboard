// Pagination
export const ITEMS_PER_PAGE = 4; // Default items per page for tables
export const DEFAULT_PAGE = 1;

// Date Range Options
export const OVERVIEW_DATE_RANGES = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Last 3 Months", value: "quarter" },
] as const;

export const ANALYTICS_DATE_RANGES = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
] as const;

// LocalStorage Keys
export const STORAGE_KEYS = {
  THEME: "theme",
  HIDDEN_WIDGETS: "hiddenWidgets",
  APP_SETTINGS: "appSettings",
} as const;

// Widget IDs
export const WIDGET_IDS = {
  QUICK_ACTIONS: "quickActions",
  KPIS: "kpis",
  REVENUE_CHART: "revenueChart",
  TRAFFIC_CHART: "trafficChart",
  ACTIVITY: "activity",
  PRODUCTS: "products",
} as const;

export const WIDGET_LABELS: Record<string, string> = {
  [WIDGET_IDS.QUICK_ACTIONS]: "Quick Actions",
  [WIDGET_IDS.KPIS]: "Key Metrics",
  [WIDGET_IDS.REVENUE_CHART]: "Revenue Chart",
  [WIDGET_IDS.TRAFFIC_CHART]: "Traffic Sources",
  [WIDGET_IDS.ACTIVITY]: "Recent Activity",
  [WIDGET_IDS.PRODUCTS]: "Top Products",
};

// Route Labels for Breadcrumbs
export const ROUTE_LABELS: Record<string, string> = {
  "/": "Overview",
  "/analytics": "Analytics",
  "/users": "Users",
  "/billing": "Billing",
  "/reports": "Reports",
  "/settings": "Settings",
  "/profile": "Profile",
};
