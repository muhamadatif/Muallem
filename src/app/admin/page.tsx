import { cookies } from "next/headers";
import Link from "next/link";
import AdminLogin from "@/features/admin/components/AdminLogin";

export default async function AdminPage() {
  const c = await cookies();
  if (c.get("admin")?.value !== "1") return <AdminLogin />;

  const { prisma } = await import("@/lib/prisma");
  const [teachers, vacancies, schools, collected, pendingTeachers, pendingVacancies] = await Promise.all([
    prisma.teacher.count(),
    prisma.vacancy.count(),
    prisma.school.count(),
    prisma.collectedRecord.count({ where: { status: "Pending" } }),
    prisma.teacher.count({ where: { verified: false } }),
    prisma.vacancy.count({ where: { status: "Open" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <form action="/api/auth/logout" method="post"><button className="text-sm text-muted-foreground hover:text-foreground">Logout</button></form>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Teachers", teachers],
          ["Pending verify", pendingTeachers],
          ["Vacancies", vacancies],
          ["Pending review", collected],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold text-primary">{val}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/review" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">Review Queue</Link>
        <Link href="/admin/collector" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">AI Collector</Link>
        <Link href="/admin/teachers" className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5">Teachers</Link>
        <Link href="/admin/vacancies" className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5">Vacancies</Link>
      </div>
    </div>
  );
}
