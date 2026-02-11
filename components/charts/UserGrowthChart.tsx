"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  users: number;
}

export function UserGrowthChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,0.4)" />
        <XAxis
          dataKey="month"
          stroke="#71717a"
          tick={{ fill: "#71717a", fontSize: 12 }}
        />
        <YAxis
          stroke="#71717a"
          tick={{ fill: "#71717a", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(24,24,28,0.95)",
            border: "1px solid rgba(63,63,70,0.6)",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [value.toLocaleString(), "Users"]}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#22c55e"
          strokeWidth={2}
          fill="url(#userGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
