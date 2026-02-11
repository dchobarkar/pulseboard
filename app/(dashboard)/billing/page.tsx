"use client";

import dynamic from "next/dynamic";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import { DollarSign } from "lucide-react";
import {
  mrrChartData,
  planDistribution,
  invoicesData,
  kpiOverview,
  type Invoice,
} from "@/data/dashboard";

const MrrChart = dynamic(
  () => import("@/components/charts/MrrChart").then((m) => m.MrrChart),
  { ssr: false }
);
const PlanPieChart = dynamic(
  () => import("@/components/charts/PlanPieChart").then((m) => m.PlanPieChart),
  { ssr: false }
);

const invoiceStatusVariant = {
  paid: "success" as const,
  pending: "warning" as const,
  overdue: "error" as const,
};

export default function BillingPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Billing</h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          MRR, plans, and invoices
        </p>
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
        <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-zinc-300">Invoices</h3>
        <Table<Invoice>
          columns={[
            { key: "id", label: "Invoice" },
            { key: "date", label: "Date" },
            {
              key: "amount",
              label: "Amount",
              render: (r) => `$${r.amount}`,
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
          ]}
          data={invoicesData}
          keyExtractor={(r) => r.id}
        />
      </div>
    </div>
  );
}
