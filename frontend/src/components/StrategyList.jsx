import { useState } from "react";

export default function StrategyList({ strategies, onEdit, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", growthRate: 0, costRate: 0 });

  const startEdit = (s) => {
    setEditId(s.id);
    setForm({ name: s.name, growthRate: s.growthRate, costRate: s.costRate });
  };

  const save = () => {
    onEdit(editId, form);
    setEditId(null);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Strategies</h3>
      <ul className="space-y-2">
        {strategies.map((s) => (
          <li
            key={s.id}
            className="flex items-center justify-between bg-gray-50 p-2 rounded"
          >
            {editId === s.id ? (
              <div className="flex flex-col gap-2">
                <input
                  className="border p-1"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="number"
                  step="0.01"
                  className="border p-1"
                  placeholder="Growth Rate"
                  value={form.growthRate}
                  onChange={(e) =>
                    setForm({ ...form, growthRate: e.target.value })
                  }
                />
                <input
                  type="number"
                  step="0.01"
                  className="border p-1"
                  placeholder="Cost Rate"
                  value={form.costRate}
                  onChange={(e) =>
                    setForm({ ...form, costRate: e.target.value })
                  }
                />
                <button
                  className="bg-green-500 text-white px-2 rounded self-start"
                  onClick={save}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>
                  {s.name} — Growth: {s.growthRate} | CostRate: {s.costRate}
                </span>
                <div className="flex gap-2">
                  <button
                    className="text-blue-600"
                    onClick={() => startEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => onDelete(s.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
