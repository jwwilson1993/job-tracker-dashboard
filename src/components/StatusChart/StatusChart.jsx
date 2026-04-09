import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './StatusChart.css';

function StatusChart({ applications, theme }) {
  const chartData = [
    {
      name: 'Applied',
      total: applications.filter((app) => app.status === 'Applied').length,
      fill: theme === 'dark' ? '#38bdf8' : '#0ea5e9'
    },
    {
      name: 'Interview',
      total: applications.filter((app) => app.status === 'Interview').length,
      fill: theme === 'dark' ? '#facc15' : '#ca8a04'
    },
    {
      name: 'Rejected',
      total: applications.filter((app) => app.status === 'Rejected').length,
      fill: theme === 'dark' ? '#f87171' : '#dc2626'
    },
    {
      name: 'Offer',
      total: applications.filter((app) => app.status === 'Offer').length,
      fill: theme === 'dark' ? '#4ade80' : '#16a34a'
    }
  ];

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#334155' : '#cbd5e1';
  const tooltipBg = theme === 'dark' ? '#0f172a' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#334155' : '#cbd5e1';
  const tooltipText = theme === 'dark' ? '#e2e8f0' : '#1e293b';

  return (
    <section className="status-chart-section">
      <h2>Application Summary</h2>

      <div className="status-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 13 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
            <YAxis allowDecimals={false} tick={{ fill: axisColor, fontSize: 13 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '12px',
                color: tooltipText
              }}
              labelStyle={{ color: tooltipText, fontWeight: 700 }}
              itemStyle={{ color: tooltipText }}
              cursor={{ fill: theme === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.06)' }}
            />
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default StatusChart;