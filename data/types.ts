/**
 * TypeScript types and interfaces
 */

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

export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: InvoiceStatus;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  category?: string;
  date: string;
  dateFrom?: string;
  dateTo?: string;
  status: "ready" | "generating" | "failed";
  scheduled?: boolean;
  scheduleFrequency?: "daily" | "weekly" | "monthly";
  emailRecipients?: string[];
  description?: string;
}

export interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "payment" | "user" | "report" | "growth";
  title: string;
  message: string;
  time: string;
  read?: boolean;
}
