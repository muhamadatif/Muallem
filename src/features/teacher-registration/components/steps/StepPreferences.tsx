"use client";

import { UseFormReturn } from "react-hook-form";
import { useLang } from "@/lib/i18n";
import { TeacherFormValues } from "../../schemas/teacher.schema";

type Props = {
  form: UseFormReturn<TeacherFormValues>;
};

export default function StepPreferences({ form }: Props) {
  const { t } = useLang();
  const tr = t.teacher;
  const { register } = form;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">{tr.salaryMin}</label>
          <input
            type="number"
            {...register("salaryMin")}
            placeholder="8000"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">{tr.salaryMax}</label>
          <input
            type="number"
            {...register("salaryMax")}
            placeholder="12000"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div>
        <textarea
          {...register("notes")}
          rows={3}
          placeholder={tr.notes}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}
