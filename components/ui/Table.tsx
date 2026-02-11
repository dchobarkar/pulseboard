import { Database } from "lucide-react";

import EmptyState from "./EmptyState";

interface TableProps<T> {
  columns: {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
  }[];
  data: T[];
  keyExtractor: (item: T) => string;
  className?: string;
  emptyState?: {
    title: string;
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
}

function Table<T extends object>({
  columns,
  data,
  keyExtractor,
  className = "",
  emptyState,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={Database}
        title={emptyState?.title || "No data available"}
        description={emptyState?.description}
        action={emptyState?.action}
      />
    );
  }

  return (
    <div className={`overflow-x-auto -mx-4 sm:mx-0 ${className}`}>
      <div className="inline-block min-w-full align-middle">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-zinc-700/60 text-zinc-400">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="pb-2 sm:pb-3 pl-3 pr-3 sm:pl-4 sm:pr-4 font-medium whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="border-b border-zinc-800/60 transition-colors hover:bg-white/3"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="py-2 sm:py-3 pl-3 pr-3 sm:pl-4 sm:pr-4 whitespace-nowrap"
                  >
                    {col.render
                      ? col.render(item)
                      : String(
                          (item as Record<string, unknown>)[String(col.key)] ??
                            "",
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
