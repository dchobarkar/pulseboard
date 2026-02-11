"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { usersData, type User, type UserRole, type UserStatus } from "@/data/dashboard";

const roleVariant: Record<UserRole, "default" | "info" | "warning" | "success"> = {
  admin: "info",
  member: "default",
  viewer: "warning",
  guest: "default",
};

const statusVariant: Record<UserStatus, "success" | "error" | "warning"> = {
  active: "success",
  inactive: "error",
  pending: "warning",
};

const ITEMS_PER_PAGE = 4;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "">("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return usersData.filter((u) => {
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = !roleFilter || u.role === roleFilter;
      const matchStatus = !statusFilter || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = useMemo(
    () =>
      filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [filtered, page]
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Users</h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Manage your team and customer accounts
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter((e.target.value || "") as UserRole | "");
              setPage(1);
            }}
            className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
          >
            <option value="">All roles</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="viewer">Viewer</option>
            <option value="guest">Guest</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter((e.target.value || "") as UserStatus | "");
              setPage(1);
            }}
            className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="glass-card transition-fade-in overflow-hidden p-0">
        <div className="p-3 sm:p-0">
          <Table<User>
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            {
              key: "role",
              label: "Role",
              render: (u) => (
                <Badge variant={roleVariant[u.role]}>
                  {u.role}
                </Badge>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (u) => (
                <Badge variant={statusVariant[u.status]}>
                  {u.status}
                </Badge>
              ),
            },
            { key: "createdAt", label: "Created" },
          ]}
          data={paginated}
          keyExtractor={(u) => u.id}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between border-t border-zinc-800/60 px-3 sm:px-4 py-3">
          <p className="text-xs sm:text-sm text-zinc-500">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex-1 sm:flex-initial rounded-lg border border-zinc-700/60 px-3 py-1.5 text-xs sm:text-sm text-zinc-300 disabled:opacity-50 hover:bg-white/5"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex-1 sm:flex-initial rounded-lg border border-zinc-700/60 px-3 py-1.5 text-xs sm:text-sm text-zinc-300 disabled:opacity-50 hover:bg-white/5"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
