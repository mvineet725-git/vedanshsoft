import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./DonutBreakdownChart.css";

export interface BreakdownDatum {
  name: string;
  value: number;
}

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

// Recharts reads inline style/fill as literal strings, not resolved CSS
// custom properties, so the var(...) tokens above are for the HTML legend
// swatches only; the chart itself needs resolved colors.
const RESOLVED_COLORS = ["#2563c7", "#12a58d", "#d98c2b", "#7a5fd6", "#c62c3a", "#2b8fd9"];

interface DonutBreakdownChartProps {
  title: string;
  data: BreakdownDatum[];
  emptyMessage?: string;
}

export default function DonutBreakdownChart({ title, data, emptyMessage = "No data yet." }: DonutBreakdownChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="card donut-breakdown-card">
      <h3 className="donut-breakdown-title">{title}</h3>

      {total === 0 ? (
        <p className="donut-breakdown-empty">{emptyMessage}</p>
      ) : (
        <div className="donut-breakdown-body">
          <div className="donut-breakdown-chart" aria-hidden="true">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={data.length > 1 ? 2 : 0}
                  isAnimationActive={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={RESOLVED_COLORS[index % RESOLVED_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => {
                    const numeric = typeof value === "number" ? value : Number(value) || 0;
                    return [`${numeric} (${Math.round((numeric / total) * 100)}%)`, name];
                  }}
                  contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: "var(--fs-xs)" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-breakdown-center">
              <span className="donut-breakdown-center-value">{total}</span>
              <span className="donut-breakdown-center-label">Total</span>
            </div>
          </div>

          <ul className="donut-breakdown-legend">
            {data.map((entry, index) => (
              <li key={entry.name}>
                <span
                  className="donut-breakdown-swatch"
                  style={{ background: CHART_COLORS[index % CHART_COLORS.length] }}
                  aria-hidden="true"
                />
                <span className="donut-breakdown-legend-name">{entry.name}</span>
                <span className="donut-breakdown-legend-value">{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
