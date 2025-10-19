// src/components/SimulationRunner.jsx
import { useState } from "react";

export default function SimulationRunner({ businesses, strategies, onRun }) {
  const [businessId, setBusinessId] = useState("");
  const [strategyId, setStrategyId] = useState("");
  const [periods, setPeriods] = useState(6);
  const [loading, setLoading] = useState(false);

  const run = async (e) => {
    e?.preventDefault();
    if (!businessId || !strategyId) return alert("Select both business and strategy");
    setLoading(true);
    try {
      const payload = { businessId: Number(businessId), strategyId: Number(strategyId), periods: Number(periods) };
      await onRun(payload);
    } catch (err) {
      alert("Simulation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-300 pt-4 mt-4 space-y-4">
      <h3 className="text-lg font-semibold">Run Simulation</h3>

      <div>
        <label className="block mb-1 font-medium">Business</label>
        <select
          value={businessId}
          onChange={e => setBusinessId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">--select--</option>
          {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Strategy</label>
        <select
          value={strategyId}
          onChange={e => setStrategyId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">--select--</option>
          {strategies.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Years/Period</label>
        <input
          type="number"
          value={periods}
          onChange={e => setPeriods(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={run}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Running..." : "Run"}
      </button>
    </div>
  );
}
