"use client";
import { useState } from "react";

export default function AdminCollector() {
  const [enabled, setEnabled] = useState(true);
  const [maxRec, setMaxRec] = useState(50);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState("");

  async function runNow() {
    setRunning(true);
    // Mock: in production this triggers the collector job
    setTimeout(() => {
      setLog("Run complete: fetched 12 records, 9 new, 3 duplicates. Pending review.");
      setRunning(false);
    }, 1200);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Data Collector</h1>
      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          Enable daily run (02:00)
        </label>
        <div>
          <label className="block text-sm font-medium">Max records/day</label>
          <input type="number" value={maxRec} onChange={(e) => setMaxRec(parseInt(e.target.value))} className="mt-1 w-32 rounded border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-1 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Facebook groups</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Job boards</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> School career pages</label>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-medium">Dedup keys</p>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Phone</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Email</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Name + city</label>
        </div>
        <button onClick={runNow} disabled={running} className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-800 disabled:opacity-60">
          {running ? "Running..." : "Run now"}
        </button>
        {log && <p className="rounded bg-gray-50 p-3 text-sm text-gray-700">{log}</p>}
      </div>
      <p className="text-xs text-gray-500">Note: collector runs server-side in production. This UI is a control panel for the scheduled job.</p>
    </div>
  );
}
