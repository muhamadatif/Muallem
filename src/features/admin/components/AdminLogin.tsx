"use client";

import { useAdminAuth } from "../hooks/useAdminAuth";

export default function AdminLogin() {
  const { pwd, setPwd, err, submit } = useAdminAuth();

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Password" className="w-full rounded border px-3 py-2 text-sm" />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button className="w-full rounded bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800">Login</button>
    </form>
  );
}
