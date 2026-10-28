"use client";

import { UseFormReturn } from "react-hook-form";
import { useLang } from "@/lib/i18n";
import { governoratesAr, governoratesEn, schoolTypesAr, schoolTypesEn } from "@/lib/governorates";
import { SchoolFormValues } from "../../schemas/school.schema";

type Props = {
  form: UseFormReturn<SchoolFormValues>;
};

export default function StepSchoolInfo({ form }: Props) {
  const { t, lang } = useLang();
  const tr = t.school;
  const govs = lang === "ar" ? governoratesAr : governoratesEn;
  const schoolTypes = lang === "ar" ? schoolTypesAr : schoolTypesEn;
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.schoolName} *</label>
        <input
          {...register("schoolName")}
          placeholder={lang === "ar" ? "مدرسة النور" : "Al-Noor School"}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.schoolName && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
      <div className="relative">
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.schoolType}</label>
        <select
          {...register("schoolType")}
          className="w-full appearance-none rounded-2xl border border-border bg-white pe-10 ps-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{lang === "ar" ? "اختر النوع" : "Choose type"}</option>
          {schoolTypes.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute end-3 top-[calc(50%+0.5rem)] h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="relative">
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.city} *</label>
        <select
          {...register("city")}
          className="w-full appearance-none rounded-2xl border border-border bg-white pe-10 ps-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{lang === "ar" ? "اختر المحافظة" : "Choose governorate"}</option>
          {govs.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute end-3 top-[calc(50%+0.5rem)] h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
        {errors.city && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.contactPerson}</label>
        <input
          {...register("contactPerson")}
          placeholder={lang === "ar" ? "السيدة سارة" : "Mrs. Sara"}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.phone} *</label>
        <input
          {...register("phone")}
          placeholder="+20 1XX XXX XXXX"
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{t.wizard.required}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{tr.email}</label>
        <input
          type="email"
          {...register("email")}
          placeholder="school@mail.com"
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}
