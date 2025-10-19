export default function ExportButton({ data, filename = "simulation_results.csv" }) {
  const downloadCSV = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const header = ["Period", "Revenue", "Cost", "Profit"];
    const rows = data.map(d => {
      const period = d.period ?? "";
      const revenue = Number(d.revenue ?? 0).toFixed(2);
      const cost = Number(d.cost ?? 0).toFixed(2);
      const profit = Number(
        d.profit ?? ((d.revenue ?? 0) - (d.cost ?? 0))
      ).toFixed(2);
      return [period, revenue, cost, profit].join(",");
    });

    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadCSV}
      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
    >
      ⬇️ Export CSV
    </button>
  );
}
