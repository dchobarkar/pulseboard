"use client";

import { LucideIcon } from "lucide-react";
import { Tooltip } from "./Tooltip";

interface KpiCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  goal?: number;
  goalLabel?: string;
  tooltip?: string;
}

export function KpiCard({
  label,
  value,
  change,
  icon: Icon,
  goal,
  goalLabel,
  tooltip,
}: KpiCardProps) {
  const positive = change !== undefined && change >= 0;
  const progress = goal ? Math.min((Number(value.toString().replace(/[^0-9.]/g, "")) / goal) * 100, 100) : undefined;

  return (
    <div className="glass-card transition-lift p-4 sm:p-5 transition-fade-in">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="text-xs sm:text-sm text-zinc-400">{label}</p>
            {tooltip && (
              <Tooltip content={tooltip}>
                <span className="text-zinc-500 cursor-help text-xs">ℹ️</span>
              </Tooltip>
            )}
          </div>
          <p className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight truncate">{value}</p>
          {change !== undefined && (
            <p
              className={`mt-1 text-xs sm:text-sm ${positive ? "text-emerald-400" : "text-rose-400"}`}
            >
              {positive ? "+" : ""}
              {change}% from last month
            </p>
          )}
          {goal && progress !== undefined && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span>{goalLabel || "Goal"}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-zinc-800/50 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
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
