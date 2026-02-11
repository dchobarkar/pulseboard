"use client";

import { useState } from "react";
import { Download, FileText, Loader2, AlertCircle } from "lucide-react";
import { reportsData, type Report } from "@/data/dashboard";

const statusConfig: Record<
  Report["status"],
  { icon: typeof FileText; label: string; color: string }
> = {
  ready: { icon: Download, label: "Download", color: "text-emerald-400" },
  generating: { icon: Loader2, label: "Generating...", color: "text-amber-400" },
  failed: { icon: AlertCircle, label: "Failed", color: "text-rose-400" },
};

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-06-30");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Reports</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Export and download operational reports
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="date-from" className="text-sm text-zinc-400">
            From
          </label>
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="date-to" className="text-sm text-zinc-400">
            To
          </label>
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="glass-card transition-fade-in divide-y divide-zinc-800/60">
        {reportsData.map((report) => {
          const config = statusConfig[report.status];
          const Icon = config.icon;
          return (
            <div
              key={report.id}
              className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/5 p-2">
                  <FileText className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <p className="font-medium text-zinc-200">{report.name}</p>
                  <p className="text-xs text-zinc-500">
                    {report.type} · {report.date}
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={report.status !== "ready"}
                className={`inline-flex items-center gap-2 rounded-lg border border-zinc-700/60 px-4 py-2 text-sm ${config.color} disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/5`}
              >
                {report.status === "generating" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                {config.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
