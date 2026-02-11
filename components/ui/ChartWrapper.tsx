"use client";

import { useState } from "react";
import { Download, FileDown } from "lucide-react";

import { exportChartAsPNG } from "@/lib/export";

interface ChartWrapperProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  chartId?: string;
  onExportCSV?: () => void;
  showExport?: boolean;
}

const ChartWrapper = ({
  title,
  children,
  className = "",
  chartId,
  onExportCSV,
  showExport = true,
}: ChartWrapperProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPNG = () => {
    if (!chartId) return;
    setIsExporting(true);
    setTimeout(() => {
      exportChartAsPNG(chartId, title || "chart");
      setIsExporting(false);
    }, 100);
  };

  return (
    <div className={`glass-card transition-fade-in p-3 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        {title && (
          <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
        )}
        {showExport && (
          <div className="flex items-center gap-2">
            {onExportCSV && (
              <button
                type="button"
                onClick={onExportCSV}
                disabled={isExporting}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors disabled:opacity-50"
                title="Export as CSV"
              >
                <FileDown className="h-4 w-4" />
              </button>
            )}
            {chartId && (
              <button
                type="button"
                onClick={handleExportPNG}
                disabled={isExporting}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors disabled:opacity-50"
                title="Export as PNG"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="min-h-50 sm:min-h-60 overflow-x-auto">
        <div id={chartId}>{children}</div>
      </div>
    </div>
  );
};

export default ChartWrapper;
