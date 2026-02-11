"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
}

export function RevenueLineChart({ data }: { data: DataPoint[] }) {
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
          labelStyle={{ color: "#a1a1aa" }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ fill: "#6366f1", strokeWidth: 0 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
