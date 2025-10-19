// src/components/HistoryPanel.jsx
import { useEffect, useState } from "react";
import { getSimulations } from "../api";

export default function HistoryPanel() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const runs = await getSimulations(); // uses /api/simulations
      // ✅ Keep only the latest 10 runs
      const latestRuns = (runs || []).slice(-10).reverse();
      setHistory(latestRuns);
    } catch (err) {
      console.error("Failed to load history", err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-4 text-gray-700">Loading history...</div>;

  if (!history.length) {
    return <div className="p-4 bg-white rounded shadow">No past simulations yet.</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">📜 Simulation History (Latest 10)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Run ID</th>
              <th className="p-2 text-left">Business</th>
              <th className="p-2 text-left">Strategy</th>
              <th className="p-2 text-left">Periods</th>
              <th className="p-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {history.map((r) => {
              const biz = r.Business?.name ?? r.BusinessId ?? "—";
              const strat = r.Strategy?.name ?? r.StrategyId ?? "—";
              const periods = Array.isArray(r.results) ? r.results.length : "—";
              const created = r.createdAt
                ? new Date(r.createdAt).toLocaleString()
                : r.created_at
                ? new Date(r.created_at).toLocaleString()
                : "-";
              return (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{biz}</td>
                  <td className="p-2">{strat}</td>
                  <td className="p-2">{periods}</td>
                  <td className="p-2">{created}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
