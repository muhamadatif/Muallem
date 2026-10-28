export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminCollector from "@/components/AdminCollector";

export default async function CollectorPage() {
  const c = await cookies();
  if (c.get("admin")?.value !== "1") return <AdminLogin />;
  return <AdminCollector />;
}

