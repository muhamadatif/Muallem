"use client";

import { UseFormReturn } from "react-hook-form";
import { useLang } from "@/lib/i18n";
import { SchoolFormValues } from "../../schemas/school.schema";

type Props = {
  form: UseFormReturn<SchoolFormValues>;
};

export default function StepDetails({ form }: Props) {
  const { t } = useLang();
  const tr = t.school;
  const { register } = form;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">{tr.salaryMin}</label>
          <input
            type="number"
            {...register("salaryMin")}
            placeholder="10000"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">{tr.salaryMax}</label>
          <input
            type="number"
            {...register("salaryMax")}
            placeholder="15000"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <textarea
        {...register("requirements")}
        rows={3}
        placeholder={tr.requirements}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <textarea
        {...register("notes")}
        rows={2}
        placeholder={tr.notes}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
