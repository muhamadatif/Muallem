"use client";
import { useEffect, useState } from "react";

type T = { id: string; fullName: string; subjects: string; city: string; verified: boolean; phone: string; email?: string; yearsExperience: number };

export default function AdminTeachers() {
  const [items, setItems] = useState<T[]>([]);
  async function load() { const r = await fetch("/api/teachers"); setItems(await r.json()); }
  useEffect(() => { load(); }, []);
  async function toggle(id: string, verified: boolean) {
    await fetch("/api/teachers", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, verified }) });
    load();
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Teachers</h1>
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Subjects</th>
              <th className="px-3 py-2 text-left">City</th>
              <th className="px-3 py-2 text-left">Exp</th>
              <th className="px-3 py-2 text-left">Verified</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-t border-border/60">
                <td className="px-3 py-2 font-medium">{t.fullName}</td>
                <td className="px-3 py-2">{t.subjects}</td>
                <td className="px-3 py-2">{t.city}</td>
                <td className="px-3 py-2">{t.yearsExperience}</td>
                <td className="px-3 py-2">{t.verified ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  <button onClick={() => toggle(t.id, !t.verified)} className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {t.verified ? "Unverify" : "Verify"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
