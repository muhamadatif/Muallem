"use client";
import { useEffect, useState } from "react";

type V = { id: string; subject: string; level: string; location: string; status: string; school: { name: string } };

export default function AdminVacancies() {
  const [items, setItems] = useState<V[]>([]);
  async function load() { const r = await fetch("/api/vacancies"); setItems(await r.json()); }
  useEffect(() => { load(); }, []);
  async function update(id: string, status: string) {
    await fetch("/api/vacancies", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Vacancies</h1>
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-3 py-2 text-left">School</th>
              <th className="px-3 py-2 text-left">Subject</th>
              <th className="px-3 py-2 text-left">Level</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => (
              <tr key={v.id} className="border-t border-border/60">
                <td className="px-3 py-2 font-medium">{v.school.name}</td>
                <td className="px-3 py-2">{v.subject}</td>
                <td className="px-3 py-2">{v.level}</td>
                <td className="px-3 py-2">{v.location}</td>
                <td className="px-3 py-2">{v.status}</td>
                <td className="px-3 py-2">
                  {v.status === "Open" && (
                    <button onClick={() => update(v.id, "Filled")} className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">Mark filled</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
