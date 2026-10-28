"use client";

import { UseFormReturn } from "react-hook-form";
import { useLang } from "@/lib/i18n";
import { TeacherFormValues } from "../../schemas/teacher.schema";

type Props = {
  form: UseFormReturn<TeacherFormValues>;
};

export default function StepPersonal({ form }: Props) {
  const { t, lang } = useLang();
  const tr = t.teacher;
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.fullName} *</label>
        <input
          {...register("fullName")}
          placeholder={lang === "ar" ? "أحمد حسن" : "Ahmed Hassan"}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.fullName && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.phone} *</label>
        <input
          {...register("phone")}
          placeholder="+20 10X XXX XXXX"
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
    </div>
  );
}
