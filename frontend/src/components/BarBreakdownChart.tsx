import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BreakdownDatum } from "./DonutBreakdownChart";
import "./BarBreakdownChart.css";

const RESOLVED_COLORS = ["#2563c7", "#12a58d", "#d98c2b", "#7a5fd6", "#c62c3a", "#2b8fd9"];

interface BarBreakdownChartProps {
  title: string;
  data: BreakdownDatum[];
  emptyMessage?: string;
}

export default function BarBreakdownChart({ title, data, emptyMessage = "No data yet." }: BarBreakdownChartProps) {
  const hasData = data.some((d) => d.value > 0);
  const chartHeight = Math.max(data.length * 36, 100);

  return (
    <div className="card bar-breakdown-card">
      <h3 className="bar-breakdown-title">{title}</h3>

      {!hasData ? (
        <p className="bar-breakdown-empty">{emptyMessage}</p>
      ) : (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid horizontal={false} stroke="var(--chart-grid, #e4eaf3)" />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#7a879c" }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              width={110}
              tick={{ fontSize: 12, fill: "#1b2430" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(37, 99, 199, 0.06)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid #dde5f0", fontSize: "12px" }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18} isAnimationActive={false}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={RESOLVED_COLORS[index % RESOLVED_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
