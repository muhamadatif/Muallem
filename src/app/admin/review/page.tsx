export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminReview from "@/components/AdminReview";

export default async function ReviewPage() {
  const c = await cookies();
  if (c.get("admin")?.value !== "1") return <AdminLogin />;
  return <AdminReview />;
}

