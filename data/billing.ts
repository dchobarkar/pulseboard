import type { InvoiceStatus, Invoice } from "./types";
export type { InvoiceStatus, Invoice };

export const INVOICE_STATUS_VARIANT: Record<
  InvoiceStatus,
  "success" | "warning" | "error"
> = {
  paid: "success",
  pending: "warning",
  overdue: "error",
};

export const PLANS = ["Starter", "Pro", "Enterprise"] as const;

export const INVOICE_STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
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
