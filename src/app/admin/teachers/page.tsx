import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminTeachers from "@/components/AdminTeachers";

export default async function TeachersPage() {
  const c = await cookies();
  if (c.get("admin")?.value !== "1") return <AdminLogin />;
  return <AdminTeachers />;
}
