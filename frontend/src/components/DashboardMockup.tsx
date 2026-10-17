import type { SampleDashboardMetric } from "../data/siteContent";
import "./DashboardMockup.css";

const TREND_BY_TAB: Record<"society" | "education", number[]> = {
  society: [62, 58, 68, 64, 72, 70, 78],
  education: [74, 70, 76, 79, 82, 80, 85],
};

interface DashboardMockupProps {
  tab: "society" | "education";
  metrics: SampleDashboardMetric[];
  title: string;
}

const SPARKLINE_WIDTH = 220;
const SPARKLINE_HEIGHT = 70;

// A hand-rolled SVG sparkline (not recharts) deliberately: this component is
// imported by the eagerly-loaded homepage, and pulling the chart library
// into that bundle would ship ~95KB gzipped to every first-time visitor
// just for a small hero preview. Real admin/demo charts (which are
// lazy-loaded) use DonutBreakdownChart/BarBreakdownChart instead.
function sparklinePoints(values: number[]): string {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * SPARKLINE_WIDTH;
      const y = SPARKLINE_HEIGHT - ((value - min) / range) * (SPARKLINE_HEIGHT - 12) - 6;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function DashboardMockup({ tab, metrics, title }: DashboardMockupProps) {
  const trendValues = TREND_BY_TAB[tab];
  const points = sparklinePoints(trendValues);
  const lastPoint = points.split(" ").pop()!.split(",").map(Number);
  const [primary, secondary, tertiary] = metrics;

  return (
    <div className="dashboard-mockup" role="img" aria-label={`Preview of the ${title} dashboard showing sample metrics and a collection trend`}>
      <div className="dashboard-mockup-topbar">
        <span className="dashboard-mockup-dot" />
        <span className="dashboard-mockup-title">{title}</span>
        <span className="dashboard-mockup-pill">This Month</span>
      </div>

      <div className="dashboard-mockup-stats">
        {[primary, secondary, tertiary].map((metric) => (
          <div className="dashboard-mockup-stat" key={metric.label}>
            <span className="dashboard-mockup-stat-label">{metric.label}</span>
            <span className="dashboard-mockup-stat-value">{metric.value}</span>
            {metric.progress !== undefined && (
              <div className="dashboard-mockup-stat-bar">
                <div className="dashboard-mockup-stat-bar-fill" style={{ width: `${metric.progress}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="dashboard-mockup-chart-row">
        <div className="dashboard-mockup-chart-card">
          <span className="dashboard-mockup-chart-title">Collection Trend</span>
          <svg
            viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
            width="100%"
            height={80}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline points={points} fill="none" stroke="#12a58d" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={lastPoint[0]} cy={lastPoint[1]} r={4} fill="#0e8a76" />
          </svg>
        </div>

        <div className="dashboard-mockup-list-card">
          <span className="dashboard-mockup-chart-title">Recent Activity</span>
          <ul className="dashboard-mockup-list">
            <li>
              <span className="dashboard-mockup-list-dot" />
              <span>New enquiry received</span>
            </li>
            <li>
              <span className="dashboard-mockup-list-dot" />
              <span>Payment recorded</span>
            </li>
            <li>
              <span className="dashboard-mockup-list-dot" />
              <span>Notice published</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
