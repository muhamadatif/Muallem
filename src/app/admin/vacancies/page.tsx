import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminVacancies from "@/components/AdminVacancies";

export default async function VacanciesPage() {
  const c = await cookies();
  if (c.get("admin")?.value !== "1") return <AdminLogin />;
  return <AdminVacancies />;
}
