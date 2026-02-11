"use client";

interface TableProps<T> {
  columns: { key: keyof T | string; label: string; render?: (item: T) => React.ReactNode }[];
  data: T[];
  keyExtractor: (item: T) => string;
  className?: string;
}

export function Table<T extends object>({
  columns,
  data,
  keyExtractor,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-700/60 text-zinc-400">
            {columns.map((col) => (
              <th key={String(col.key)} className="pb-3 pl-4 pr-4 font-medium">
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
                <td key={String(col.key)} className="py-3 pl-4 pr-4">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[String(col.key)] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
