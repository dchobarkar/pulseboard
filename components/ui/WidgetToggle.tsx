"use client";

import { ReactNode } from "react";

interface WidgetToggleProps {
  widgetId: string;
  isHidden: boolean;
  onToggle: (widgetId: string) => void;
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}

export function WidgetToggle({
  widgetId,
  isHidden,
  onToggle,
  children,
  header,
  className = "",
}: WidgetToggleProps) {
  if (isHidden) return null;

  return (
    <div className={className}>
      {header && (
        <div className="flex items-center justify-between mb-2">
          {header}
          <button
            type="button"
            onClick={() => onToggle(widgetId)}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Hide
          </button>
        </div>
      )}
      {children}
    </div>
  );
}
