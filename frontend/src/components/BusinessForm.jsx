// src/components/BusinessForm.jsx
import { useState } from "react";

export default function BusinessForm({ onCreated }) {
  const [name, setName] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [cost, setCost] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Enter a name");
    try {
      await onCreated({ name, revenue: Number(revenue), cost: Number(cost) });
      setName(""); setRevenue(0); setCost(0);
    } catch (err) {
      alert("Failed to create business: " + err.message);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 mb-4">
      <h3 className="text-lg font-semibold">Create Business</h3>

      <div>
        <label className="block mb-1 font-medium">Business Name</label>
        <input
          placeholder="Enter business name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Revenue (Rs)</label>
        <input
          type="number"
          placeholder="Enter revenue"
          value={revenue}
          onChange={e => setRevenue(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Cost (Rs)</label>
        <input
          type="number"
          placeholder="Enter cost"
          value={cost}
          onChange={e => setCost(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}
