"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { RefreshCw, Clock, Download, FileDown } from "lucide-react";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { exportToCSV } from "@/lib/export";
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
  const [compareMode, setCompareMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

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

  const previousRevenueVsExpenses = useMemo(() => {
    // Get previous period data for comparison
    switch (dateRange) {
      case "7d":
        return revenueVsExpenses7d.map((item) => ({
          month: `${item.month} (Prev)`,
          revenue: Math.floor(item.revenue * 0.92), // Simulate previous period
          expenses: Math.floor(item.expenses * 0.95),
        }));
      case "30d":
        return revenueVsExpenses30d.map((item) => ({
          month: `${item.month} (Prev)`,
          revenue: Math.floor(item.revenue * 0.88),
          expenses: Math.floor(item.expenses * 0.92),
        }));
      default:
        return revenueVsExpenses.map((item) => ({
          month: `${item.month} (Prev)`,
          revenue: Math.floor(item.revenue * 0.85),
          expenses: Math.floor(item.expenses * 0.90),
        }));
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

  const previousUserGrowth = useMemo(() => {
    return filteredUserGrowth.map((item) => ({
      month: `${item.month} (Prev)`,
      users: Math.floor(item.users * 0.85),
    }));
  }, [filteredUserGrowth]);

  const comparisonRevenueData = useMemo(() => {
    if (!compareMode) return filteredRevenueVsExpenses;
    // Interleave current and previous for better comparison
    const result: typeof filteredRevenueVsExpenses = [];
    const current = filteredRevenueVsExpenses.map((item) => ({
      ...item,
      month: `${item.month} (Current)`,
    }));
    const previous = previousRevenueVsExpenses;
    
    // Combine both datasets
    return [...current, ...previous];
  }, [compareMode, filteredRevenueVsExpenses, previousRevenueVsExpenses]);

  const comparisonUserData = useMemo(() => {
    if (!compareMode) return filteredUserGrowth;
    const current = filteredUserGrowth.map((item) => ({
      ...item,
      month: `${item.month} (Current)`,
    }));
    const previous = previousUserGrowth;
    return [...current, ...previous];
  }, [compareMode, filteredUserGrowth, previousUserGrowth]);

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

  const handleExportRevenue = () => {
    exportToCSV(
      compareMode
        ? [
            ...filteredRevenueVsExpenses.map((item) => ({
              ...item,
              period: "Current",
            })),
            ...previousRevenueVsExpenses.map((item) => ({
              ...item,
              period: "Previous",
            })),
          ]
        : filteredRevenueVsExpenses,
      `revenue-expenses-${dateRange}${compareMode ? "-comparison" : ""}`
    );
  };

  const handleExportUsers = () => {
    exportToCSV(
      compareMode
        ? [
            ...filteredUserGrowth.map((item) => ({ ...item, period: "Current" })),
            ...previousUserGrowth.map((item) => ({ ...item, period: "Previous" })),
          ]
        : filteredUserGrowth,
      `user-growth-${dateRange}${compareMode ? "-comparison" : ""}`
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <Breadcrumbs />
          <h1 className="mt-2 text-xl sm:text-2xl font-semibold text-white">Analytics</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Revenue, growth, funnel, and retention
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Clock className="h-3 w-3" />
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
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
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={compareMode}
            onChange={(e) => setCompareMode(e.target.checked)}
            className="rounded border-zinc-700/60 bg-zinc-900/80 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-zinc-300">Compare with previous period</span>
        </label>
      </div>

      {/* Charts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartWrapper
          title={compareMode ? "Revenue vs expenses (Comparison)" : "Revenue vs expenses"}
          chartId="revenue-expenses-chart"
          onExportCSV={handleExportRevenue}
        >
          <RevenueVsExpensesChart data={comparisonRevenueData} />
        </ChartWrapper>
        <ChartWrapper
          title={compareMode ? "User growth (Comparison)" : "User growth"}
          chartId="user-growth-chart"
          onExportCSV={handleExportUsers}
        >
          <UserGrowthChart data={comparisonUserData} />
        </ChartWrapper>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartWrapper title="Conversion funnel" chartId="funnel-chart">
          <FunnelChart data={filteredFunnel} />
        </ChartWrapper>
        <ChartWrapper title="Retention" chartId="retention-chart">
          <RetentionChart data={filteredRetention} />
        </ChartWrapper>
      </div>
    </div>
  );
}
