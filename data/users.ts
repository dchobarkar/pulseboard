import type { UserRole, UserStatus, User } from "./types";
export type { UserRole, UserStatus, User };

export const ROLE_VARIANT: Record<
  UserRole,
  "default" | "info" | "warning" | "success"
> = {
  admin: "info",
  member: "default",
  viewer: "warning",
  guest: "default",
};

export const STATUS_VARIANT: Record<
  UserStatus,
  "success" | "error" | "warning"
> = {
  active: "success",
  inactive: "error",
  pending: "warning",
};

export const ROLE_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "Admin", value: "admin" },
  { label: "Member", value: "member" },
  { label: "Viewer", value: "viewer" },
  { label: "Guest", value: "guest" },
];

export const STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

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
