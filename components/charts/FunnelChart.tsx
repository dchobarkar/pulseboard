"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FunnelStep {
  stage: string;
  count: number;
}

export function FunnelChart({ data }: { data: FunnelStep[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 60, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,0.4)" />
        <XAxis
          type="number"
          stroke="#71717a"
          tick={{ fill: "#71717a", fontSize: 12 }}
          tickFormatter={(v) => `${v / 1000}k`}
        />
        <YAxis
          type="category"
          dataKey="stage"
          stroke="#71717a"
          tick={{ fill: "#71717a", fontSize: 12 }}
          width={55}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(24,24,28,0.95)",
            border: "1px solid rgba(63,63,70,0.6)",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [value.toLocaleString(), "Count"]}
        />
        <Bar
          dataKey="count"
          fill="#8b5cf6"
          radius={[0, 4, 4, 0]}
          maxBarSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
