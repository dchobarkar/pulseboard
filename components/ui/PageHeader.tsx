"use client";

import { ReactNode } from "react";
import { RefreshCw, Clock } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  lastUpdated?: Date;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  lastUpdated,
  isRefreshing = false,
  onRefresh,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <Breadcrumbs />
        <h1 className="mt-2 text-xl sm:text-2xl font-semibold text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {lastUpdated && (
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Clock className="h-3 w-3" />
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        )}
        {actions}
      </div>
    </div>
  );
}
