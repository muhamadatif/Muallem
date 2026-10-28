"use client";
import { useLang } from "@/lib/i18n";
import SchoolWizard from "@/components/SchoolWizard";
import Link from "next/link";

export default function NeedTeacherPage() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{t.needTeacher.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.needTeacher.subtitle}</p>
      </div>
      <SchoolWizard />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/" className="text-primary hover:underline">← {t.nav.how}</Link>
      </p>
    </div>
  );
}

