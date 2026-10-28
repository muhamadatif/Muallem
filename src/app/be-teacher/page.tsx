"use client";
import { useLang } from "@/lib/i18n";
import TeacherWizard from "@/components/TeacherWizard";
import Link from "next/link";

export default function BeTeacherPage() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{t.beTeacher.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.beTeacher.subtitle}</p>
      </div>
      <TeacherWizard />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/" className="text-primary hover:underline">← {t.nav.how}</Link>
      </p>
    </div>
  );
}

