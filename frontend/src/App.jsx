// src/App.jsx
import './index.css';
import { useEffect, useState } from "react";
import {
  getBusinesses, createBusiness, updateBusiness, deleteBusiness,
  getStrategies, createStrategy, updateStrategy, deleteStrategy,
  runSimulation, getSimulations
} from "./api";
import BusinessForm from "./components/BusinessForm";
import StrategyForm from "./components/StrategyForm";
import BusinessList from "./components/BusinessList";
import StrategyList from "./components/StrategyList";
import SimulationRunner from "./components/SimulationRunner";
import ResultsChart from "./components/ResultsChart";
import HistoryPanel from "./components/HistoryPanel";
import FinanceMetrics from "./components/FinanceMetrics";
import ExportButton from "./components/ExportButton";

export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [latestResults, setLatestResults] = useState(null);
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [b, s, r] = await Promise.all([getBusinesses(), getStrategies(), getSimulations()]);
      setBusinesses(b); setStrategies(s); setRuns(r);
      setError("");
    } catch (err) {
      setError("Failed to load data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateBusiness = async (data) => { await createBusiness(data); loadData(); };
  const handleCreateStrategy = async (data) => { await createStrategy(data); loadData(); };
  const handleEditBusiness = async (id, data) => { await updateBusiness(id, data); loadData(); };
  const handleDeleteBusiness = async (id) => { await deleteBusiness(id); loadData(); };
  const handleEditStrategy = async (id, data) => { await updateStrategy(id, data); loadData(); };
  const handleDeleteStrategy = async (id) => { await deleteStrategy(id); loadData(); };

  const handleRun = async (payload) => {
    const res = await runSimulation(payload);
    setLatestResults(res.results);
    await loadData();
  };

  if (loading) return <div className="text-center p-8 text-xl text-gray-700">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Business Simulation Dashboard</h1>
        <p className="text-gray-600">Manage businesses, strategies, and run simulations with analytics.</p>
      </header>

      {/* Business & Strategy Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Businesses</h2>
          <BusinessForm onCreated={handleCreateBusiness} />
          <BusinessList businesses={businesses} onEdit={handleEditBusiness} onDelete={handleDeleteBusiness} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Strategies</h2>
          <StrategyForm onCreated={handleCreateStrategy} />
          <StrategyList strategies={strategies} onEdit={handleEditStrategy} onDelete={handleDeleteStrategy} />
        </div>
      </div>

      {/* Simulation Runner */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Run Simulation</h2>
        <SimulationRunner businesses={businesses} strategies={strategies} onRun={handleRun} />
      </div>

      {/* Latest Simulation Results */}
      {latestResults && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Latest Simulation Results</h2>

          <ResultsChart data={latestResults} />

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <FinanceMetrics data={latestResults} />
            </div>
            <div className="md:ml-4 flex-shrink-0">
              <ExportButton data={latestResults} />
            </div>
          </div>
        </div>
      )}

      {/* Simulation History (kept) */}
      <div className="mb-8">
        <HistoryPanel history={runs.slice(-10).reverse()} />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6">
        &copy; {new Date().getFullYear()} Business Simulation Dashboard
      </footer>
    </div>
  );
}
