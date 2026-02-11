"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import { Modal } from "@/components/ui/Modal";
import { Dropdown } from "@/components/ui/Dropdown";
import {
  Plus,
  DollarSign,
  Search,
  MoreVertical,
  Download,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  mrrChartData,
  planDistribution,
  invoicesData,
  kpiOverview,
  type Invoice,
  type InvoiceStatus,
} from "@/data/dashboard";

const MrrChart = dynamic(
  () => import("@/components/charts/MrrChart").then((m) => m.MrrChart),
  { ssr: false }
);
const PlanPieChart = dynamic(
  () => import("@/components/charts/PlanPieChart").then((m) => m.PlanPieChart),
  { ssr: false }
);

const invoiceStatusVariant: Record<InvoiceStatus, "success" | "warning" | "error"> = {
  paid: "success",
  pending: "warning",
  overdue: "error",
};

const plans = ["Starter", "Pro", "Enterprise"];

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "">("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    plan: "Pro",
    status: "pending" as InvoiceStatus,
  });

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      const matchSearch =
        !search ||
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.plan.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || inv.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, search, statusFilter]);

  const handleAddInvoice = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      plan: "Pro",
      status: "pending",
    });
    setIsAddModalOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setFormData({
      date: invoice.date,
      amount: String(invoice.amount),
      plan: invoice.plan,
      status: invoice.status,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleSaveInvoice = () => {
    if (!formData.amount || !formData.date) return;

    if (isAddModalOpen) {
      const newInvoice: Invoice = {
        id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
        date: formData.date,
        amount: Number(formData.amount),
        plan: formData.plan,
        status: formData.status,
      };
      setInvoices([...invoices, newInvoice].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
      setIsAddModalOpen(false);
    } else if (isEditModalOpen && selectedInvoice) {
      setInvoices(
        invoices.map((inv) =>
          inv.id === selectedInvoice.id
            ? {
                ...inv,
                date: formData.date,
                amount: Number(formData.amount),
                plan: formData.plan,
                status: formData.status,
              }
            : inv
        )
      );
      setIsEditModalOpen(false);
      setSelectedInvoice(null);
    }
    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      plan: "Pro",
      status: "pending",
    });
  };

  const handleConfirmDelete = () => {
    if (selectedInvoice) {
      setInvoices(invoices.filter((inv) => inv.id !== selectedInvoice.id));
      setIsDeleteModalOpen(false);
      setSelectedInvoice(null);
    }
  };

  const handleStatusUpdate = (invoice: Invoice, newStatus: InvoiceStatus) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoice.id ? { ...inv, status: newStatus } : inv
      )
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Billing</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            MRR, plans, and invoices
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddInvoice}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Invoice
        </button>
      </div>

      <KpiCard
        label={kpiOverview.mrr.label}
        value={`$${kpiOverview.mrr.value.toLocaleString()}`}
        change={kpiOverview.mrr.change}
        icon={DollarSign}
      />

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartWrapper title="Monthly recurring revenue">
          <MrrChart data={mrrChartData} />
        </ChartWrapper>
        <ChartWrapper title="Plan distribution">
          <PlanPieChart data={planDistribution} />
        </ChartWrapper>
      </div>

      <div className="glass-card transition-fade-in p-3 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xs sm:text-sm font-medium text-zinc-300">Invoices</h3>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 sm:flex-initial sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="search"
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter((e.target.value || "") as InvoiceStatus | "")
              }
              className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
            >
              <option value="">All statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
        <Table<Invoice>
          columns={[
            { key: "id", label: "Invoice" },
            { key: "date", label: "Date" },
            {
              key: "amount",
              label: "Amount",
              render: (r) => `$${r.amount.toLocaleString()}`,
            },
            { key: "plan", label: "Plan" },
            {
              key: "status",
              label: "Status",
              render: (r) => (
                <Badge variant={invoiceStatusVariant[r.status]}>
                  {r.status}
                </Badge>
              ),
            },
            {
              key: "actions",
              label: "Actions",
              render: (inv) => (
                <Dropdown
                  trigger={
                    <button
                      type="button"
                      className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
                      aria-label="Invoice actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  }
                  items={[
                    {
                      label: "View",
                      onClick: () => handleViewInvoice(inv),
                    },
                    {
                      label: "Edit",
                      onClick: () => handleEditInvoice(inv),
                    },
                    ...(inv.status !== "paid"
                      ? [
                          {
                            label: "Mark as Paid",
                            onClick: () => handleStatusUpdate(inv, "paid"),
                          },
                        ]
                      : []),
                    ...(inv.status !== "overdue"
                      ? [
                          {
                            label: "Mark as Overdue",
                            onClick: () => handleStatusUpdate(inv, "overdue"),
                          },
                        ]
                      : []),
                    {
                      label: "Delete",
                      onClick: () => handleDeleteInvoice(inv),
                    },
                  ]}
                  align="right"
                />
              ),
            },
          ]}
          data={filtered}
          keyExtractor={(r) => r.id}
        />
      </div>

      {/* Add Invoice Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Invoice"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Invoice Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Amount ($)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="299"
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Plan</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as InvoiceStatus })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveInvoice}
              disabled={!formData.amount || !formData.date}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Invoice
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

      {/* Edit Invoice Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedInvoice(null);
        }}
        title="Edit Invoice"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Invoice ID</label>
            <input
              type="text"
              value={selectedInvoice?.id || ""}
              disabled
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Invoice Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Amount ($)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Plan</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as InvoiceStatus })
                }
                className="w-full rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveInvoice}
              disabled={!formData.amount || !formData.date}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedInvoice(null);
              }}
              className="rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* View Invoice Modal */}
      <Modal
        open={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedInvoice(null);
        }}
        title={`Invoice ${selectedInvoice?.id}`}
      >
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/50 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-500">Invoice ID</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {selectedInvoice.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Date</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {selectedInvoice.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Plan</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {selectedInvoice.plan}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Status</p>
                  <div className="mt-1">
                    <Badge variant={invoiceStatusVariant[selectedInvoice.status]}>
                      {selectedInvoice.status}
                    </Badge>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-zinc-500">Amount</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    ${selectedInvoice.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700/60 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditInvoice(selectedInvoice);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                Edit Invoice
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedInvoice(null);
        }}
        title="Delete Invoice"
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-300">
            Are you sure you want to delete invoice{" "}
            <span className="font-semibold text-white">
              {selectedInvoice?.id}
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
                setSelectedInvoice(null);
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
