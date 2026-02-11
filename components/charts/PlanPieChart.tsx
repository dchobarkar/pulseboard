"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PlanItem {
  name: string;
  value: number;
  color: string;
}

export function PlanPieChart({ data }: { data: PlanItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "rgba(24,24,28,0.95)",
            border: "1px solid rgba(63,63,70,0.6)",
            borderRadius: "8px",
          }}
          formatter={(value: number, name: string) => [`${value}%`, name]}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px" }}
          formatter={(value) => <span className="text-zinc-300">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
