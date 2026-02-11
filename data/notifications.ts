/**
 * Notification-related constants, configurations, and data
 */

import {
  CheckCircle2,
  AlertCircle,
  Info,
  CreditCard,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { Notification } from "./types";
export type { Notification };

export const NOTIFICATION_ICONS = {
  success: CheckCircle2,
  warning: AlertCircle,
  info: Info,
  payment: CreditCard,
  user: Users,
  report: FileText,
  growth: TrendingUp,
} as const;

export const NOTIFICATION_COLORS = {
  success: "text-emerald-400 bg-emerald-500/20",
  warning: "text-amber-400 bg-amber-500/20",
  info: "text-blue-400 bg-blue-500/20",
  payment: "text-indigo-400 bg-indigo-500/20",
  user: "text-purple-400 bg-purple-500/20",
  report: "text-cyan-400 bg-cyan-500/20",
  growth: "text-green-400 bg-green-500/20",
} as const;

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
