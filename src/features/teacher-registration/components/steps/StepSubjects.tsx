"use client";

import { UseFormReturn } from "react-hook-form";
import { useLang } from "@/lib/i18n";
import { TeacherFormValues } from "../../schemas/teacher.schema";

type Props = {
  form: UseFormReturn<TeacherFormValues>;
};

export default function StepSubjects({ form }: Props) {
  const { t, lang } = useLang();
  const tr = t.teacher;
  const stages = t.stages;
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.subjects} *</label>
        <input
          {...register("subjects")}
          placeholder={lang === "ar" ? "رياضيات، فيزياء" : "Math, Physics"}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.subjects && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.levels} *</label>
        <input
          {...register("levels")}
          placeholder={lang === "ar" ? "الصف التاسع، العاشر" : "Grade 9, 10"}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.levels && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
      <div className="relative">
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.stage} *</label>
        <select
          {...register("educationStage")}
          className="w-full appearance-none rounded-2xl border border-border bg-white pe-10 ps-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{lang === "ar" ? "اختر المرحلة" : "Choose stage"}</option>
          {stages.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute end-3 top-[calc(50%+0.5rem)] h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
        {errors.educationStage && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
    </div>
  );
}
