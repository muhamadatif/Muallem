"use client";
import { useEffect, useState } from "react";

type Rec = { id: string; source: string; kind: string; name: string; subject?: string; city?: string; phone?: string; email?: string; status: string; scrapedAt: string };

export default function AdminReview() {
  const [records, setRecords] = useState<Rec[]>([]);
  async function load() {
    const r = await fetch("/api/collected");
    setRecords(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function update(id: string, status: string) {
    await fetch("/api/collected", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Review Queue</h1>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Source</th>
              <th className="px-3 py-2 text-left">Kind</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Subject</th>
              <th className="px-3 py-2 text-left">City</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">{r.source}</td>
                <td className="px-3 py-2">{r.kind}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.subject || "—"}</td>
                <td className="px-3 py-2">{r.city || "—"}</td>
                <td className="px-3 py-2">{r.status}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => update(r.id, "Approved")} className="rounded bg-green-600 px-2 py-1 text-xs text-white">Approve</button>
                    <button onClick={() => update(r.id, "Rejected")} className="rounded bg-red-600 px-2 py-1 text-xs text-white">Reject</button>
                    <button onClick={() => update(r.id, "Duplicate")} className="rounded bg-gray-600 px-2 py-1 text-xs text-white">Dup</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
