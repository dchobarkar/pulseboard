"use client";

import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
}

export function KpiCard({ label, value, change, icon: Icon }: KpiCardProps) {
  const positive = change !== undefined && change >= 0;
  return (
    <div className="glass-card transition-lift p-4 sm:p-5 transition-fade-in">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-zinc-400">{label}</p>
          <p className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight truncate">{value}</p>
          {change !== undefined && (
            <p
              className={`mt-1 text-xs sm:text-sm ${positive ? "text-emerald-400" : "text-rose-400"}`}
            >
              {positive ? "+" : ""}
              {change}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-white/5 p-2 shrink-0 ml-2">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />
          </div>
        )}
      </div>
    </div>
  );
}
