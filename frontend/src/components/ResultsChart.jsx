// src/components/ResultsChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ResultsChart({ data }) {
  if (!data || data.length === 0)
    return <div className="text-center text-gray-700">No results to show</div>;

  // Ensure numbers are clean
  const plotData = data.map((d) => ({
    period: d.period,
    revenue: Number(d.revenue),
    cost: Number(d.cost),
    profit: Number(d.profit),
  }));

  // ---- Comparison box calculations ----
  // Baseline = first data point (without strategy)
  const base = plotData[0];
  const baseRevenue = base.revenue;
  const baseCost = base.cost;
  const baseProfit = base.revenue - base.cost;

  // Strategy = average of all points
  const avgRevenue =
    plotData.reduce((acc, d) => acc + d.revenue, 0) / plotData.length;
  const avgCost =
    plotData.reduce((acc, d) => acc + d.cost, 0) / plotData.length;
  const avgProfit =
    plotData.reduce((acc, d) => acc + d.profit, 0) / plotData.length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Simulation Results
      </h3>

      {/* Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={plotData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              label={{
                value: "Period",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              dot={false}
              stroke="#2563eb"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="cost"
              dot={false}
              stroke="#dc2626"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="profit"
              dot={false}
              stroke="#16a34a"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Without Strategy */}
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Without Strategy
          </h4>
          <p className="text-gray-800">Revenue: Rs {baseRevenue.toFixed(2)}</p>
          <p className="text-gray-800">Cost: Rs {baseCost.toFixed(2)}</p>
          <p className="text-gray-800 font-semibold">
            Profit: Rs {baseProfit.toFixed(2)}
          </p>
        </div>

        {/* With Strategy */}
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            With Strategy (Avg)
          </h4>
          <p className="text-gray-800">Revenue: Rs {avgRevenue.toFixed(2)}</p>
          <p className="text-gray-800">Cost: Rs {avgCost.toFixed(2)}</p>
          <p className="text-gray-800 font-semibold">
            Profit: Rs {avgProfit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
