// src/components/FinanceMetrics.jsx
export default function FinanceMetrics({ data }) {
  // data: array of { period, revenue, cost, profit } OR results from your backend
  if (!data || data.length === 0) return null;

  const revenueArr = data.map(d => Number(d.revenue || 0));
  const costArr = data.map(d => Number(d.cost || 0));
  const profitArr = data.map(d => Number(d.profit ?? (d.revenue - d.cost)));

  const totalRevenue = revenueArr.reduce((a,b) => a + b, 0);
  const totalCost = costArr.reduce((a,b) => a + b, 0);
  const totalProfit = profitArr.reduce((a,b) => a + b, 0);

  const ROI = totalCost !== 0 ? (totalProfit / totalCost) * 100 : null;

  // break-even period: first period where cumulative profit >= 0
  let cum = 0;
  let breakEven = null;
  for (let i = 0; i < profitArr.length; i++) {
    cum += profitArr[i];
    if (breakEven === null && cum >= 0) {
      breakEven = i + 1; // 1-based
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">📊 Financial Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Total Revenue</div>
          <div className="text-xl font-semibold">Rs {totalRevenue.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Total Cost</div>
          <div className="text-xl font-semibold">Rs. {totalCost.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Total Profit</div>
          <div className="text-xl font-semibold">Rs {totalProfit.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-white rounded border">
          <div className="text-sm text-gray-600">ROI</div>
          <div className="text-lg font-semibold">
            {ROI === null ? "N/A" : `${ROI.toFixed(2)}%`}
          </div>
        </div>
        <div className="p-3 bg-white rounded border">
          <div className="text-sm text-gray-600">Break-even Period</div>
          <div className="text-lg font-semibold">{breakEven ?? "Not reached"}</div>
        </div>
      </div>
    </div>
  );
}
