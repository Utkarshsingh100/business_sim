import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:3000/api/health")
      .then(r => r.json())
      .then(d => setStatus(JSON.stringify(d)))
      .catch(e => setStatus("error: " + e.message));
  }, []);

  return (
    <div>
      <h1>Business Sim (dev)</h1>
      <pre>{status}</pre>
    </div>
  );
}
