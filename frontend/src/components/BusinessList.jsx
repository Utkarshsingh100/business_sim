import { useState } from "react";

export default function BusinessList({ businesses, onEdit, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", revenue: 0, cost: 0 });

  const startEdit = (b) => {
    setEditId(b.id);
    setForm({ name: b.name, revenue: b.revenue, cost: b.cost });
  };

  const save = () => {
    onEdit(editId, form);
    setEditId(null);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Businesses</h3>
      <ul className="space-y-2">
        {businesses.map(b => (
          <li key={b.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            {editId === b.id ? (
  <div className="flex flex-col gap-2">
    <input
      className="border p-1"
      placeholder="Name"
      value={form.name}
      onChange={e => setForm({ ...form, name: e.target.value })}
    />
    <input
      type="number"
      className="border p-1"
      placeholder="Revenue"
      value={form.revenue}
      onChange={e => setForm({ ...form, revenue: e.target.value })}
    />
    <input
      type="number"
      className="border p-1"
      placeholder="Cost"
      value={form.cost}
      onChange={e => setForm({ ...form, cost: e.target.value })}
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
                <span>{b.name} — Rev: {b.revenue} | Cost: {b.cost}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600" onClick={() => startEdit(b)}>Edit</button>
                  <button className="text-red-600" onClick={() => onDelete(b.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
