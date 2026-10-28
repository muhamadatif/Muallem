import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const b = await req.json();
  const pwd = process.env.ADMIN_PASSWORD || "admin123";
  if (b.password !== pwd) return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "1", { httpOnly: true, path: "/", maxAge: 60 * 60 * 8 });
  return res;
}
