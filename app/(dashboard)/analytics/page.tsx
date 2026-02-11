"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import {
  revenueVsExpenses,
  revenueVsExpenses7d,
  revenueVsExpenses30d,
  userGrowthData,
  userGrowthData7d,
  userGrowthData30d,
  funnelSteps,
  funnelSteps7d,
  funnelSteps30d,
  retentionData,
  retentionData7d,
  retentionData30d,
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

  const filteredRevenueVsExpenses = useMemo(() => {
    switch (dateRange) {
      case "7d":
        return revenueVsExpenses7d;
      case "30d":
        return revenueVsExpenses30d;
      case "90d":
        return revenueVsExpenses;
      default:
        return revenueVsExpenses30d;
    }
  }, [dateRange]);

  const filteredUserGrowth = useMemo(() => {
    switch (dateRange) {
      case "7d":
        return userGrowthData7d;
      case "30d":
        return userGrowthData30d;
      case "90d":
        return userGrowthData;
      default:
        return userGrowthData30d;
    }
  }, [dateRange]);

  const filteredFunnel = useMemo(() => {
    switch (dateRange) {
      case "7d":
        return funnelSteps7d;
      case "30d":
        return funnelSteps30d;
      case "90d":
        return funnelSteps;
      default:
        return funnelSteps30d;
    }
  }, [dateRange]);

  const filteredRetention = useMemo(() => {
    switch (dateRange) {
      case "7d":
        return retentionData7d;
      case "30d":
        return retentionData30d;
      case "90d":
        return retentionData;
      default:
        return retentionData30d;
    }
  }, [dateRange]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Analytics</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Revenue, growth, funnel, and retention
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
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

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartWrapper title="Revenue vs expenses">
          <RevenueVsExpensesChart data={filteredRevenueVsExpenses} />
        </ChartWrapper>
        <ChartWrapper title="User growth">
          <UserGrowthChart data={filteredUserGrowth} />
        </ChartWrapper>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartWrapper title="Conversion funnel">
          <FunnelChart data={filteredFunnel} />
        </ChartWrapper>
        <ChartWrapper title="Retention">
          <RetentionChart data={filteredRetention} />
        </ChartWrapper>
      </div>
    </div>
  );
}
