"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  DollarSign,
  Users,
  TrendingUp,
  Percent,
  Activity,
  RefreshCw,
  Download,
  Plus,
  FileText,
  BarChart3,
  UserPlus,
  Calendar,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { Table } from "@/components/ui/Table";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { exportToCSV, exportTableToCSV } from "@/lib/export";
import {
  kpiOverview,
  revenueChartData,
  trafficSources,
  recentActivity,
  topProducts,
  overviewDataToday,
  overviewDataWeek,
  overviewDataMonth,
  overviewDataLastMonth,
  overviewDataQuarter,
} from "@/data/dashboard";

const RevenueLineChart = dynamic(
  () => import("@/components/charts/RevenueLineChart").then((m) => m.RevenueLineChart),
  { ssr: false }
);
const TrafficPieChart = dynamic(
  () => import("@/components/charts/TrafficPieChart").then((m) => m.TrafficPieChart),
  { ssr: false }
);

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Last 3 Months", value: "quarter" },
];

const quickActions = [
  { label: "Add User", icon: UserPlus, href: "/users", action: "add" },
  { label: "Generate Report", icon: FileText, href: "/reports", action: "generate" },
  { label: "View Analytics", icon: BarChart3, href: "/analytics", action: "view" },
];

export default function OverviewPage() {
  const [selectedRange, setSelectedRange] = useState("month");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hiddenWidgets, setHiddenWidgets] = useState<Set<string>>(new Set());
  const [showHiddenWidgets, setShowHiddenWidgets] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hiddenWidgets");
      if (saved) {
        try {
          setHiddenWidgets(new Set(JSON.parse(saved)));
        } catch (e) {
          console.error("Failed to load widget preferences:", e);
        }
      }
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const toggleWidget = (widgetId: string) => {
    const newHidden = new Set(hiddenWidgets);
    if (newHidden.has(widgetId)) {
      newHidden.delete(widgetId);
    } else {
      newHidden.add(widgetId);
    }
    setHiddenWidgets(newHidden);
    if (typeof window !== "undefined") {
      localStorage.setItem("hiddenWidgets", JSON.stringify(Array.from(newHidden)));
    }
  };

  // Get filtered data based on selected range
  const getFilteredData = () => {
    switch (selectedRange) {
      case "today":
        return overviewDataToday;
      case "week":
        return overviewDataWeek;
      case "month":
        return overviewDataMonth;
      case "lastMonth":
        return overviewDataLastMonth;
      case "quarter":
        return overviewDataQuarter;
      default:
        return overviewDataMonth;
    }
  };

  const filteredData = getFilteredData();

  const handleExportRevenue = () => {
    exportToCSV(filteredData.revenueChart, `revenue-${selectedRange}`);
  };

  const handleExportTraffic = () => {
    exportToCSV(filteredData.trafficSources, `traffic-sources-${selectedRange}`);
  };

  const handleExportProducts = () => {
    exportTableToCSV(
      filteredData.topProducts,
      [
        { key: "name", label: "Product" },
        { key: "revenue", label: "Revenue" },
        { key: "units", label: "Units" },
      ],
      `top-products-${selectedRange}`
    );
  };

  const kpis = [
    {
      label: filteredData.kpis.revenue.label,
      value: `$${filteredData.kpis.revenue.value.toLocaleString()}`,
      change: filteredData.kpis.revenue.change,
      icon: DollarSign,
      goal: selectedRange === "today" ? 2000 : selectedRange === "week" ? 15000 : selectedRange === "lastMonth" ? 45000 : 50000,
      goalLabel: selectedRange === "today" ? "Daily Goal" : selectedRange === "week" ? "Weekly Goal" : "Monthly Goal",
      tooltip: "Total revenue generated in the selected period",
    },
    {
      label: filteredData.kpis.activeUsers.label,
      value: filteredData.kpis.activeUsers.value.toLocaleString(),
      change: filteredData.kpis.activeUsers.change,
      icon: Users,
      goal: selectedRange === "today" ? 12500 : selectedRange === "week" ? 12500 : selectedRange === "lastMonth" ? 11000 : 15000,
      goalLabel: "Target",
      tooltip: "Number of active users in the current period",
    },
    {
      label: filteredData.kpis.conversionRate.label,
      value: `${filteredData.kpis.conversionRate.value}%`,
      change: filteredData.kpis.conversionRate.change,
      icon: Percent,
      goal: 5,
      goalLabel: "Target %",
      tooltip: "Percentage of visitors who convert to customers",
    },
    {
      label: filteredData.kpis.monthlyGrowth.label,
      value: `${filteredData.kpis.monthlyGrowth.value}%`,
      change: filteredData.kpis.monthlyGrowth.change,
      icon: TrendingUp,
      tooltip: "Month-over-month growth percentage",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Breadcrumbs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <Breadcrumbs />
          <h1 className="mt-2 text-xl sm:text-2xl font-semibold text-white">Overview</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Key metrics and performance at a glance
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

      {/* Date Range Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {dateRanges.map((range) => (
          <button
            key={range.value}
            type="button"
            onClick={() => setSelectedRange(range.value)}
            className={`rounded-lg border px-3 py-1.5 text-xs sm:text-sm transition-colors ${
              selectedRange === range.value
                ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                : "border-zinc-700/60 bg-zinc-900/50 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Hidden Widgets Restore Section */}
      {hiddenWidgets.size > 0 && (
        <div className="glass-card transition-fade-in p-4">
          <button
            type="button"
            onClick={() => setShowHiddenWidgets(!showHiddenWidgets)}
            className="flex w-full items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-300">
                Hidden Widgets ({hiddenWidgets.size})
              </span>
            </div>
            {showHiddenWidgets ? (
              <ChevronUp className="h-4 w-4 text-zinc-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            )}
          </button>
          {showHiddenWidgets && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-zinc-500 mb-3">
                Click "Show" to restore any hidden widget
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {hiddenWidgets.has("quickActions") && (
                  <div className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3">
                    <span className="text-sm text-zinc-300">Quick Actions</span>
                    <button
                      type="button"
                      onClick={() => toggleWidget("quickActions")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Show
                    </button>
                  </div>
                )}
                {hiddenWidgets.has("kpis") && (
                  <div className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3">
                    <span className="text-sm text-zinc-300">Key Metrics</span>
                    <button
                      type="button"
                      onClick={() => toggleWidget("kpis")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Show
                    </button>
                  </div>
                )}
                {hiddenWidgets.has("revenueChart") && (
                  <div className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3">
                    <span className="text-sm text-zinc-300">Revenue Chart</span>
                    <button
                      type="button"
                      onClick={() => toggleWidget("revenueChart")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Show
                    </button>
                  </div>
                )}
                {hiddenWidgets.has("trafficChart") && (
                  <div className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3">
                    <span className="text-sm text-zinc-300">Traffic Sources</span>
                    <button
                      type="button"
                      onClick={() => toggleWidget("trafficChart")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Show
                    </button>
                  </div>
                )}
                {hiddenWidgets.has("activity") && (
                  <div className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3">
                    <span className="text-sm text-zinc-300">Recent Activity</span>
                    <button
                      type="button"
                      onClick={() => toggleWidget("activity")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Show
                    </button>
                  </div>
                )}
                {hiddenWidgets.has("products") && (
                  <div className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3">
                    <span className="text-sm text-zinc-300">Top Products</span>
                    <button
                      type="button"
                      onClick={() => toggleWidget("products")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Show
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setHiddenWidgets(new Set());
                  if (typeof window !== "undefined") {
                    localStorage.setItem("hiddenWidgets", JSON.stringify([]));
                  }
                }}
                className="mt-3 w-full rounded-lg border border-indigo-500/50 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-500/20 transition-colors"
              >
                Show All Widgets
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      {!hiddenWidgets.has("quickActions") && (
        <div className="glass-card transition-fade-in p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-zinc-300">Quick Actions</h3>
            <button
              type="button"
              onClick={() => toggleWidget("quickActions")}
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              Hide
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3 hover:bg-white/5 transition-colors group"
                >
                  <div className="rounded-lg bg-indigo-500/10 p-2 group-hover:bg-indigo-500/20 transition-colors">
                    <Icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className="text-sm text-zinc-300">{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      {!hiddenWidgets.has("kpis") && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-zinc-300">Key Metrics</h2>
            <button
              type="button"
              onClick={() => toggleWidget("kpis")}
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              Hide
            </button>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                change={kpi.change}
                icon={kpi.icon}
                goal={kpi.goal}
                goalLabel={kpi.goalLabel}
                tooltip={kpi.tooltip}
              />
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {!hiddenWidgets.has("revenueChart") && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Revenue Chart</span>
              <button
                type="button"
                onClick={() => toggleWidget("revenueChart")}
                className="text-xs text-zinc-500 hover:text-zinc-300"
              >
                Hide
              </button>
            </div>
            <ChartWrapper
              title="Revenue"
              chartId="revenue-chart"
              onExportCSV={handleExportRevenue}
            >
              <RevenueLineChart data={filteredData.revenueChart} />
            </ChartWrapper>
          </div>
        )}
        {!hiddenWidgets.has("trafficChart") && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Traffic Sources</span>
              <button
                type="button"
                onClick={() => toggleWidget("trafficChart")}
                className="text-xs text-zinc-500 hover:text-zinc-300"
              >
                Hide
              </button>
            </div>
            <ChartWrapper
              title="Traffic sources"
              chartId="traffic-chart"
              onExportCSV={handleExportTraffic}
            >
              <TrafficPieChart data={filteredData.trafficSources} />
            </ChartWrapper>
          </div>
        )}
      </div>

      {/* Activity and Products */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {!hiddenWidgets.has("activity") && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Recent Activity</span>
              <button
                type="button"
                onClick={() => toggleWidget("activity")}
                className="text-xs text-zinc-500 hover:text-zinc-300"
              >
                Hide
              </button>
            </div>
            <div className="glass-card transition-fade-in p-3 sm:p-5">
              <h3 className="mb-3 sm:mb-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300">
                <Activity className="h-4 w-4" />
                Recent activity
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {filteredData.recentActivity.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between border-b border-zinc-800/60 pb-2 sm:pb-3 last:border-0 last:pb-0 group cursor-pointer hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors"
                    title={`${a.user} - ${a.action} - ${a.time}`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-zinc-200 truncate">{a.user}</p>
                      <p className="text-xs text-zinc-500 truncate">{a.action}</p>
                    </div>
                    <span className="text-xs text-zinc-500 ml-2 shrink-0">{a.time}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View all activity →
              </button>
            </div>
          </div>
        )}
        {!hiddenWidgets.has("products") && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">Top Products</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportProducts}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
                  title="Export as CSV"
                >
                  <Download className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleWidget("products")}
                  className="text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Hide
                </button>
              </div>
            </div>
            <div className="glass-card transition-fade-in p-3 sm:p-5">
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-zinc-300">
                Top products
              </h3>
              <Table
                columns={[
                  { key: "name", label: "Product" },
                  {
                    key: "revenue",
                    label: "Revenue",
                    render: (r) => `$${r.revenue.toLocaleString()}`,
                  },
                  { key: "units", label: "Units" },
                ]}
                data={filteredData.topProducts}
                keyExtractor={(r) => r.name}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
