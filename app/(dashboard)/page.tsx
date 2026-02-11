"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  DollarSign,
  Users,
  TrendingUp,
  Percent,
  Activity,
  Download,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { Table } from "@/components/ui/Table";
import PageHeader from "@/components/ui/PageHeader";
import { DateRangeFilter } from "@/components/ui/DateRangeFilter";
import Card from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/Card";
import { WidgetToggle } from "@/components/ui/WidgetToggle";
import HiddenWidgetsPanel from "@/components/ui/HiddenWidgetsPanel";
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
} from "@/data/overview";
import { OVERVIEW_DATE_RANGES, WIDGET_LABELS, STORAGE_KEYS } from "@/data/constants";
import { QUICK_ACTIONS } from "@/data/navigation";

const RevenueLineChart = dynamic(
  () => import("@/components/charts/RevenueLineChart").then((m) => m.RevenueLineChart),
  { ssr: false }
);
const TrafficPieChart = dynamic(
  () => import("@/components/charts/TrafficPieChart").then((m) => m.TrafficPieChart),
  { ssr: false }
);


const OverviewPage = () => {
  const [selectedRange, setSelectedRange] = useState("month");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hiddenWidgets, setHiddenWidgets] = useState<Set<string>>(new Set());
  const [showHiddenWidgets, setShowHiddenWidgets] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.HIDDEN_WIDGETS);
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
      localStorage.setItem(STORAGE_KEYS.HIDDEN_WIDGETS, JSON.stringify(Array.from(newHidden)));
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
      <PageHeader
        title="Overview"
        description="Key metrics and performance at a glance"
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <DateRangeFilter
        options={OVERVIEW_DATE_RANGES}
        selectedValue={selectedRange}
        onChange={setSelectedRange}
      />

      <HiddenWidgetsPanel
        hiddenWidgets={hiddenWidgets}
        widgetLabels={WIDGET_LABELS}
        onShowWidget={toggleWidget}
        onShowAll={() => {
          setHiddenWidgets(new Set());
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.HIDDEN_WIDGETS, JSON.stringify([]));
          }
        }}
      />

      {/* Quick Actions */}
      <WidgetToggle
        widgetId="quickActions"
        isHidden={hiddenWidgets.has("quickActions")}
        onToggle={toggleWidget}
        header={<h3 className="text-sm font-medium text-zinc-300">Quick Actions</h3>}
      >
        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {QUICK_ACTIONS.map((action) => {
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
        </Card>
      </WidgetToggle>

      {/* KPI Cards */}
      <WidgetToggle
        widgetId="kpis"
        isHidden={hiddenWidgets.has("kpis")}
        onToggle={toggleWidget}
        header={<h2 className="text-sm font-medium text-zinc-300">Key Metrics</h2>}
      >
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
      </WidgetToggle>

      {/* Charts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <WidgetToggle
          widgetId="revenueChart"
          isHidden={hiddenWidgets.has("revenueChart")}
          onToggle={toggleWidget}
          header={<span className="text-xs text-zinc-500">Revenue Chart</span>}
        >
          <ChartWrapper
            title="Revenue"
            chartId="revenue-chart"
            onExportCSV={handleExportRevenue}
          >
            <RevenueLineChart data={filteredData.revenueChart} />
          </ChartWrapper>
        </WidgetToggle>
        <WidgetToggle
          widgetId="trafficChart"
          isHidden={hiddenWidgets.has("trafficChart")}
          onToggle={toggleWidget}
          header={<span className="text-xs text-zinc-500">Traffic Sources</span>}
        >
          <ChartWrapper
            title="Traffic sources"
            chartId="traffic-chart"
            onExportCSV={handleExportTraffic}
          >
            <TrafficPieChart data={filteredData.trafficSources} />
          </ChartWrapper>
        </WidgetToggle>
      </div>

      {/* Activity and Products */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <WidgetToggle
          widgetId="activity"
          isHidden={hiddenWidgets.has("activity")}
          onToggle={toggleWidget}
          header={<span className="text-xs text-zinc-500">Recent Activity</span>}
        >
          <Card padding="lg">
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
          </Card>
        </WidgetToggle>
        <WidgetToggle
          widgetId="products"
          isHidden={hiddenWidgets.has("products")}
          onToggle={toggleWidget}
          header={
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Top Products</span>
              <button
                type="button"
                onClick={handleExportProducts}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
                title="Export as CSV"
              >
                <Download className="h-3 w-3" />
              </button>
            </div>
          }
        >
          <Card padding="lg">
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
          </Card>
        </WidgetToggle>
      </div>
    </div>
  );
};

export default OverviewPage;
