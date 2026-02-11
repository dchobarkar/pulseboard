"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import {
  revenueVsExpenses,
  userGrowthData,
  funnelSteps,
  retentionData,
} from "@/data/dashboard";

const RevenueVsExpensesChart = dynamic(
  () =>
    import("@/components/charts/RevenueVsExpensesChart").then(
      (m) => m.RevenueVsExpensesChart
    ),
  { ssr: false }
);
const UserGrowthChart = dynamic(
  () =>
    import("@/components/charts/UserGrowthChart").then((m) => m.UserGrowthChart),
  { ssr: false }
);
const FunnelChart = dynamic(
  () => import("@/components/charts/FunnelChart").then((m) => m.FunnelChart),
  { ssr: false }
);
const RetentionChart = dynamic(
  () =>
    import("@/components/charts/RetentionChart").then((m) => m.RetentionChart),
  { ssr: false }
);

const dateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
] as const;

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<string>("30d");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Revenue, growth, funnel, and retention
          </p>
        </div>
        <div className="flex gap-2">
          {dateRanges.map((range) => (
            <button
              key={range.value}
              type="button"
              onClick={() => setDateRange(range.value)}
              className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                dateRange === range.value
                  ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300"
                  : "border-zinc-700/60 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartWrapper title="Revenue vs expenses">
          <RevenueVsExpensesChart data={revenueVsExpenses} />
        </ChartWrapper>
        <ChartWrapper title="User growth">
          <UserGrowthChart data={userGrowthData} />
        </ChartWrapper>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartWrapper title="Conversion funnel">
          <FunnelChart data={funnelSteps} />
        </ChartWrapper>
        <ChartWrapper title="Retention">
          <RetentionChart data={retentionData} />
        </ChartWrapper>
      </div>
    </div>
  );
}
