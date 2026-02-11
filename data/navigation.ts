/**
 * Navigation-related constants and configurations
 */

import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  FileText,
  Settings,
  UserPlus,
  FileText as FileTextIcon,
} from "lucide-react";

export const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/users", label: "Users", icon: Users },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export const QUICK_ACTIONS = [
  { label: "Add User", icon: UserPlus, href: "/users", action: "add" },
  { label: "Generate Report", icon: FileTextIcon, href: "/reports", action: "generate" },
  { label: "View Analytics", icon: BarChart3, href: "/analytics", action: "view" },
] as const;

export const USER_MENU_ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "Preferences", href: "/settings?tab=preferences" },
] as const;
