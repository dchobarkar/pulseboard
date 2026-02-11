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
    <div className="glass-card transition-lift p-5 transition-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
          {change !== undefined && (
            <p
              className={`mt-1 text-sm ${positive ? "text-emerald-400" : "text-rose-400"}`}
            >
              {positive ? "+" : ""}
              {change}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-white/5 p-2">
            <Icon className="h-5 w-5 text-zinc-400" />
          </div>
        )}
      </div>
    </div>
  );
}
