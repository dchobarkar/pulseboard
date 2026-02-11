"use client";

import { useState } from "react";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";

import Card from "./Card";
import Button from "./Button";

interface HiddenWidget {
  id: string;
  label: string;
}

interface HiddenWidgetsPanelProps {
  hiddenWidgets: Set<string>;
  widgetLabels: Record<string, string>;
  onShowWidget: (widgetId: string) => void;
  onShowAll?: () => void;
}

const HiddenWidgetsPanel = ({
  hiddenWidgets,
  widgetLabels,
  onShowWidget,
  onShowAll,
}: HiddenWidgetsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (hiddenWidgets.size === 0) return null;

  const hiddenWidgetsList: HiddenWidget[] = Array.from(hiddenWidgets)
    .map((id) => ({
      id,
      label: widgetLabels[id] || id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Card>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-300">
            Hidden Widgets ({hiddenWidgets.size})
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-zinc-500 mb-3">
            Click &quot;Show&quot; to restore any hidden widget
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {hiddenWidgetsList.map((widget) => (
              <div
                key={widget.id}
                className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-900/50 p-3"
              >
                <span className="text-sm text-zinc-300">{widget.label}</span>
                <button
                  type="button"
                  onClick={() => onShowWidget(widget.id)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Show
                </button>
              </div>
            ))}
          </div>
          {onShowAll && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onShowAll}
              className="mt-3 w-full"
            >
              Show All Widgets
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default HiddenWidgetsPanel;
