"use client";

import dynamic from "next/dynamic";
import { DollarSign, Users, TrendingUp, Percent, Activity } from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { Table } from "@/components/ui/Table";
import {
  kpiOverview,
  revenueChartData,
  trafficSources,
  recentActivity,
  topProducts,
} from "@/data/dashboard";

const RevenueLineChart = dynamic(
  () => import("@/components/charts/RevenueLineChart").then((m) => m.RevenueLineChart),
  { ssr: false }
);
const TrafficPieChart = dynamic(
  () => import("@/components/charts/TrafficPieChart").then((m) => m.TrafficPieChart),
  { ssr: false }
);

export default function OverviewPage() {
  const kpis = [
    {
      label: kpiOverview.revenue.label,
      value: `$${kpiOverview.revenue.value.toLocaleString()}`,
      change: kpiOverview.revenue.change,
      icon: DollarSign,
    },
    {
      label: kpiOverview.activeUsers.label,
      value: kpiOverview.activeUsers.value.toLocaleString(),
      change: kpiOverview.activeUsers.change,
      icon: Users,
    },
    {
      label: kpiOverview.conversionRate.label,
      value: `${kpiOverview.conversionRate.value}%`,
      change: kpiOverview.conversionRate.change,
      icon: Percent,
    },
    {
      label: kpiOverview.monthlyGrowth.label,
      value: `${kpiOverview.monthlyGrowth.value}%`,
      change: kpiOverview.monthlyGrowth.change,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Overview</h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Key metrics and performance at a glance
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartWrapper title="Revenue">
          <RevenueLineChart data={revenueChartData} />
        </ChartWrapper>
        <ChartWrapper title="Traffic sources">
          <TrafficPieChart data={trafficSources} />
        </ChartWrapper>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="glass-card transition-fade-in p-3 sm:p-5">
          <h3 className="mb-3 sm:mb-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300">
            <Activity className="h-4 w-4" />
            Recent activity
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {recentActivity.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between border-b border-zinc-800/60 pb-2 sm:pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-zinc-200 truncate">{a.user}</p>
                  <p className="text-xs text-zinc-500 truncate">{a.action}</p>
                </div>
                <span className="text-xs text-zinc-500 ml-2 shrink-0">{a.time}</span>
              </li>
            ))}
          </ul>
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
            data={topProducts}
            keyExtractor={(r) => r.name}
          />
        </div>
      </div>
    </div>
  );
}
