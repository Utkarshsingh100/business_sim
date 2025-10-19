// src/components/StrategyForm.jsx
import { useState } from "react";

export default function StrategyForm({ onCreated }) {
  const [name, setName] = useState("");
  const [growthRate, setGrowthRate] = useState(0.05);
  const [costRate, setCostRate] = useState(0.02);

  const submit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Enter a name");
    try {
      await onCreated({ name, growthRate: Number(growthRate), costRate: Number(costRate) });
      setName(""); setGrowthRate(0.05); setCostRate(0.02);
    } catch (err) {
      alert("Failed to create strategy: " + err.message);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 mb-4">
      <h3 className="text-lg font-semibold">Create Strategy</h3>

      <div>
        <label className="block mb-1 font-medium">Strategy Name</label>
        <input
          placeholder="Enter strategy name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Growth Rate (e.g., 0.05)</label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter growth rate"
          value={growthRate}
          onChange={e => setGrowthRate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Cost Rate (e.g., 0.02)</label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter cost rate"
          value={costRate}
          onChange={e => setCostRate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create
      </button>
    </form>
  );
}
