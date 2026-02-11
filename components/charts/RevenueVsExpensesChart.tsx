"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

export function RevenueVsExpensesChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,0.4)" />
        <XAxis
          dataKey="month"
          stroke="#71717a"
          tick={{ fill: "#71717a", fontSize: 12 }}
        />
        <YAxis
          stroke="#71717a"
          tick={{ fill: "#71717a", fontSize: 12 }}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(24,24,28,0.95)",
            border: "1px solid rgba(63,63,70,0.6)",
            borderRadius: "8px",
          }}
          formatter={(value: number, name: string) => [
            `$${value.toLocaleString()}`,
            name === "revenue" ? "Revenue" : "Expenses",
          ]}
        />
        <Legend
          formatter={(value) => (
            <span className="text-zinc-300">
              {value === "revenue" ? "Revenue" : "Expenses"}
            </span>
          )}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          name="revenue"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ fill: "#6366f1", strokeWidth: 0 }}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          name="expenses"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ fill: "#f59e0b", strokeWidth: 0 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
