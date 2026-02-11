"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Edit2, Trash2, MoreVertical } from "lucide-react";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Dropdown } from "@/components/ui/Dropdown";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  usersData,
  type User,
  type UserRole,
  type UserStatus,
  ROLE_VARIANT,
  STATUS_VARIANT,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
} from "@/data/users";
import { ITEMS_PER_PAGE } from "@/data/constants";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "">("");
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "member" as UserRole,
    status: "active" as UserStatus,
  });

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = !roleFilter || u.role === roleFilter;
      const matchStatus = !statusFilter || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = useMemo(
    () =>
      filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [filtered, page]
  );

  const handleAddUser = () => {
    setFormData({
      name: "",
      email: "",
      role: "member",
      status: "active",
    });
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) return;

    if (isAddModalOpen) {
      const newUser: User = {
        id: String(users.length + 1),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
      setIsAddModalOpen(false);
    } else if (isEditModalOpen && selectedUser) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, ...formData } : u
        )
      );
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
    setFormData({
      name: "",
      email: "",
      role: "member",
      status: "active",
    });
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      if (filtered.length <= (page - 1) * ITEMS_PER_PAGE && page > 1) {
        setPage(page - 1);
      }
    }
  };


  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader
        title="Users"
        description="Manage your team and customer accounts"
        actions={
          <Button icon={Plus} onClick={handleAddUser}>
            Add User
          </Button>
        }
      />

      <FilterBar>
        <SearchBar
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1"
        />
        <FilterSelect
          label="Role"
          value={roleFilter}
          onChange={(value) => {
            setRoleFilter((value || "") as UserRole | "");
            setPage(1);
          }}
          options={ROLE_OPTIONS}
          placeholder="All roles"
        />
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter((value || "") as UserStatus | "");
            setPage(1);
          }}
          options={STATUS_OPTIONS}
          placeholder="All statuses"
        />
      </FilterBar>

      <Card className="overflow-hidden p-0">
        <div className="p-3 sm:p-0">
          <Table<User>
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            {
              key: "role",
              label: "Role",
              render: (u) => (
                <Badge variant={ROLE_VARIANT[u.role]}>
                  {u.role}
                </Badge>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (u) => (
                <Badge variant={STATUS_VARIANT[u.status]}>
                  {u.status}
                </Badge>
              ),
            },
            { key: "createdAt", label: "Created" },
            {
              key: "actions",
              label: "Actions",
              render: (u) => (
                <Dropdown
                  trigger={
                    <button
                      type="button"
                      className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
                      aria-label="User actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  }
                  items={[
                    {
                      label: "Edit",
                      onClick: () => handleEditUser(u),
                    },
                    {
                      label: "Delete",
                      onClick: () => handleDeleteUser(u),
                    },
                  ]}
                  align="right"
                />
              ),
            },
          ]}
          data={paginated}
          keyExtractor={(u) => u.id}
          emptyState={{
            title: "No users found",
            description: filtered.length === 0 && search
              ? "Try adjusting your search or filters"
              : "Get started by adding your first user",
            action: filtered.length === 0 && !search
              ? {
                  label: "Add User",
                  onClick: () => setIsAddModalOpen(true),
                }
              : undefined,
          }}
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
      </Card>

      {/* Add User Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as UserRole })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as UserStatus })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveUser}
              disabled={!formData.name || !formData.email}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="Edit User"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as UserRole })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as UserStatus })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveUser}
              disabled={!formData.name || !formData.email}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
              }}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        title="Delete User"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-300">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {selectedUser?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 transition-colors"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
