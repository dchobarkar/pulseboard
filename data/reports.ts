import { Download, Loader2, AlertCircle, FileText } from "lucide-react";

import type { Report } from "./types";
export type { Report };

export const REPORT_TYPES = ["CSV", "PDF", "Excel", "JSON", "PNG"] as const;

export const SCHEDULE_FREQUENCIES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
] as const;

export type DatePreset =
  | { label: string; days: number }
  | { label: string; days: null; preset: "thisMonth" | "lastMonth" };

export const DATE_PRESETS: DatePreset[] = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "This month", days: null, preset: "thisMonth" },
  { label: "Last month", days: null, preset: "lastMonth" },
];

export const REPORT_STATUS_CONFIG: Record<
  Report["status"],
  {
    icon: typeof FileText;
    label: string;
    color: string;
    badgeVariant: "success" | "warning" | "error";
  }
> = {
  ready: {
    icon: Download,
    label: "Download",
    color: "text-emerald-400",
    badgeVariant: "success",
  },
  generating: {
    icon: Loader2,
    label: "Generating...",
    color: "text-amber-400",
    badgeVariant: "warning",
  },
  failed: {
    icon: AlertCircle,
    label: "Failed",
    color: "text-rose-400",
    badgeVariant: "error",
  },
};

export const REPORT_STATUS_OPTIONS = [
  { label: "Ready", value: "ready" },
  { label: "Generating", value: "generating" },
  { label: "Failed", value: "failed" },
] as const;

export const REPORT_TYPE_OPTIONS = REPORT_TYPES.map((type) => ({
  label: type,
  value: type,
}));

export const reportTemplates = [
  {
    id: "financial-summary",
    name: "Financial Summary",
    category: "Financial",
    description: "Revenue, expenses, and profit analysis",
  },
  {
    id: "user-growth",
    name: "User Growth Report",
    category: "Performance",
    description: "User acquisition and growth metrics",
  },
  {
    id: "sales-performance",
    name: "Sales Performance",
    category: "Sales",
    description: "Sales metrics and conversion rates",
  },
  {
    id: "marketing-campaigns",
    name: "Marketing Campaigns",
    category: "Marketing",
    description: "Campaign performance and ROI",
  },
  {
    id: "operational-status",
    name: "Operational Status",
    category: "Operational",
    description: "System health and operational metrics",
  },
];

export const reportCategories = [
  "Financial",
  "Performance",
  "Marketing",
  "Sales",
  "Operational",
  "Status",
];

// Helper function to generate date ranges relative to today
const getDateRanges = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const last7DaysFrom = new Date(today);
  last7DaysFrom.setDate(last7DaysFrom.getDate() - 6);

  const last30DaysFrom = new Date(today);
  last30DaysFrom.setDate(last30DaysFrom.getDate() - 29);

  const last90DaysFrom = new Date(today);
  last90DaysFrom.setDate(last90DaysFrom.getDate() - 89);

  const thisMonthFrom = new Date(today.getFullYear(), today.getMonth(), 1);

  const lastMonthFrom = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthTo = new Date(today.getFullYear(), today.getMonth(), 0);

  const oldDate1 = new Date(today);
  oldDate1.setDate(oldDate1.getDate() - 120);
  const oldDate2 = new Date(today);
  oldDate2.setDate(oldDate2.getDate() - 100);

  return {
    today: today.toISOString().split("T")[0],
    last7DaysFrom: last7DaysFrom.toISOString().split("T")[0],
    last30DaysFrom: last30DaysFrom.toISOString().split("T")[0],
    last90DaysFrom: last90DaysFrom.toISOString().split("T")[0],
    thisMonthFrom: thisMonthFrom.toISOString().split("T")[0],
    lastMonthFrom: lastMonthFrom.toISOString().split("T")[0],
    lastMonthTo: lastMonthTo.toISOString().split("T")[0],
    oldDate1: oldDate1.toISOString().split("T")[0],
    oldDate2: oldDate2.toISOString().split("T")[0],
  };
};

const dateRanges = getDateRanges();

export const reportsData: Report[] = [
  {
    id: "1",
    name: "Weekly Revenue Summary",
    type: "CSV",
    category: "Financial",
    date: dateRanges.today,
    dateFrom: dateRanges.last7DaysFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: true,
    scheduleFrequency: "weekly",
    emailRecipients: ["admin@example.com"],
    description: "Weekly revenue breakdown for the past 7 days",
  },
  {
    id: "2",
    name: "Recent User Activity",
    type: "PDF",
    category: "Performance",
    date: dateRanges.today,
    dateFrom: dateRanges.last7DaysFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: false,
    description: "User activity and engagement metrics for the last week",
  },
  {
    id: "3",
    name: "Monthly Revenue Summary",
    type: "CSV",
    category: "Financial",
    date: dateRanges.today,
    dateFrom: dateRanges.last30DaysFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: true,
    scheduleFrequency: "monthly",
    emailRecipients: ["admin@example.com", "finance@example.com"],
    description: "Comprehensive monthly revenue breakdown",
  },
  {
    id: "4",
    name: "User Acquisition Report",
    type: "PDF",
    category: "Performance",
    date: dateRanges.today,
    dateFrom: dateRanges.last30DaysFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: false,
    description: "New user signups and acquisition metrics for the past month",
  },
  {
    id: "5",
    name: "Marketing Campaign Performance",
    type: "Excel",
    category: "Marketing",
    date: dateRanges.today,
    dateFrom: dateRanges.last30DaysFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: true,
    scheduleFrequency: "monthly",
    emailRecipients: ["marketing@example.com"],
    description: "Marketing campaign ROI and performance metrics",
  },
  {
    id: "6",
    name: "Quarterly Analytics Export",
    type: "CSV",
    category: "Operational",
    date: dateRanges.today,
    dateFrom: dateRanges.last90DaysFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: false,
    description: "Quarterly analytics data export covering the past 90 days",
  },
  {
    id: "7",
    name: "Sales Performance Report",
    type: "PDF",
    category: "Sales",
    date: dateRanges.today,
    dateFrom: dateRanges.last90DaysFrom,
    dateTo: dateRanges.today,
    status: "generating",
    scheduled: false,
    description: "Comprehensive sales performance analysis for Q2",
  },
  {
    id: "8",
    name: "Churn Analysis",
    type: "Excel",
    category: "Performance",
    date: dateRanges.today,
    dateFrom: dateRanges.last90DaysFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: true,
    scheduleFrequency: "monthly",
    emailRecipients: ["analytics@example.com"],
    description: "User churn and retention analysis for the quarter",
  },
  {
    id: "9",
    name: "Current Month Revenue",
    type: "CSV",
    category: "Financial",
    date: dateRanges.today,
    dateFrom: dateRanges.thisMonthFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: true,
    scheduleFrequency: "daily",
    emailRecipients: ["admin@example.com"],
    description: "Daily revenue tracking for the current month",
  },
  {
    id: "10",
    name: "Monthly User Growth",
    type: "PDF",
    category: "Performance",
    date: dateRanges.today,
    dateFrom: dateRanges.thisMonthFrom,
    dateTo: dateRanges.today,
    status: "ready",
    scheduled: false,
    description: "User growth metrics for the current month",
  },
  {
    id: "11",
    name: "Previous Month Summary",
    type: "CSV",
    category: "Financial",
    date: dateRanges.lastMonthTo,
    dateFrom: dateRanges.lastMonthFrom,
    dateTo: dateRanges.lastMonthTo,
    status: "ready",
    scheduled: true,
    scheduleFrequency: "monthly",
    emailRecipients: ["admin@example.com"],
    description: "Complete financial summary for the previous month",
  },
  {
    id: "12",
    name: "Last Month Billing Overview",
    type: "PDF",
    category: "Financial",
    date: dateRanges.lastMonthTo,
    dateFrom: dateRanges.lastMonthFrom,
    dateTo: dateRanges.lastMonthTo,
    status: "ready",
    scheduled: false,
    description: "Billing and invoice overview for last month",
  },
  {
    id: "13",
    name: "Previous Month Analytics",
    type: "Excel",
    category: "Operational",
    date: dateRanges.lastMonthTo,
    dateFrom: dateRanges.lastMonthFrom,
    dateTo: dateRanges.lastMonthTo,
    status: "ready",
    scheduled: false,
    description: "Operational metrics and analytics for last month",
  },
  {
    id: "14",
    name: "Historical Q1 Report",
    type: "CSV",
    category: "Financial",
    date: dateRanges.oldDate1,
    dateFrom: dateRanges.oldDate2,
    dateTo: dateRanges.oldDate1,
    status: "ready",
    scheduled: false,
    description: "Historical Q1 financial report",
  },
  {
    id: "15",
    name: "Old Analytics Export",
    type: "PDF",
    category: "Operational",
    date: dateRanges.oldDate2,
    dateFrom: dateRanges.oldDate2,
    dateTo: dateRanges.oldDate1,
    status: "failed",
    scheduled: false,
    description: "Older analytics export (over 90 days old)",
  },
];
