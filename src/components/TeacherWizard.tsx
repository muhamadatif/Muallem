"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { governoratesAr, governoratesEn } from "@/lib/governorates";
import SuccessCheck from "@/components/SuccessCheck";

type FieldProps = { name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean; autoFocus?: boolean; placeholder?: string };
function Input({ name, label, value, onChange, type = "text", required = false, autoFocus = false, placeholder }: FieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} autoFocus={autoFocus} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

type SelectProps = { name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; required?: boolean; placeholder?: string };
function Select({ name, label, value, onChange, options, required = false, placeholder }: SelectProps) {
  const { lang } = useLang();
  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-foreground">{label}{required && " *"}</label>
      <select name={name} required={required} value={value} onChange={onChange}
        className="w-full appearance-none rounded-2xl border border-border bg-white pe-10 ps-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
        <option value="">{placeholder || (lang === "ar" ? "اختر..." : "Select...")}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="pointer-events-none absolute end-3 top-[calc(50%+0.5rem)] h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export default function TeacherWizard() {
  const { t, lang } = useLang();
  const tr = t.teacher;
  const w = t.wizard;
  const stages = t.stages;
  const avail = t.availability;
  const govs = lang === "ar" ? governoratesAr : governoratesEn;

  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  }

  const steps = [
    { title: tr.s1t, fields: (
      <>
        <Input name="fullName" label={tr.fullName} value={data.fullName || ""} onChange={update} required placeholder={lang === "ar" ? "أحمد حسن" : "Ahmed Hassan"} />
        <Input name="phone" label={tr.phone} value={data.phone || ""} onChange={update} required placeholder="+20 10X XXX XXXX" />
      </>
    )},
    { title: tr.s2t, fields: (
      <>
        <Input name="subjects" label={tr.subjects} value={data.subjects || ""} onChange={update} required placeholder={lang === "ar" ? "رياضيات، فيزياء" : "Math, Physics"} />
        <Input name="levels" label={tr.levels} value={data.levels || ""} onChange={update} required placeholder={lang === "ar" ? "الصف التاسع، العاشر" : "Grade 9, 10"} />
        <Select name="educationStage" label={tr.stage} value={data.educationStage || ""} onChange={update} options={stages} required placeholder={lang === "ar" ? "اختر المرحلة" : "Choose stage"} />
      </>
    )},
    { title: tr.s3t, fields: (
      <>
        <Select name="city" label={tr.city} value={data.city || ""} onChange={update} options={govs} required placeholder={lang === "ar" ? "اختر المحافظة" : "Choose governorate"} />
        <Input name="yearsExperience" label={tr.yearsExperience} value={data.yearsExperience || ""} onChange={update} type="number" placeholder="5" />
        <Select name="availability" label={tr.availability} value={data.availability || ""} onChange={update} options={avail} placeholder={lang === "ar" ? "اختر" : "Choose"} />
      </>
    )},
    { title: tr.s4t, fields: (
      <>
        <div className="grid grid-cols-2 gap-3">
          <Input name="salaryMin" label={tr.salaryMin} value={data.salaryMin || ""} onChange={update} type="number" placeholder="8000" />
          <Input name="salaryMax" label={tr.salaryMax} value={data.salaryMax || ""} onChange={update} type="number" placeholder="12000" />
        </div>
        <textarea name="notes" value={data.notes || ""} onChange={update} rows={3} placeholder={tr.notes}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </>
    )},
  ];

  function validate() {
    const required: string[] = step === 0 ? ["fullName", "phone"] : step === 1 ? ["subjects", "levels", "educationStage"] : step === 2 ? ["city"] : [];
    for (const r of required) if (!data[r]) return false;
    return true;
  }

  async function next() {
    if (!validate()) { setError(w.required); return; }
    setError("");
    if (step < steps.length - 1) setStep(step + 1);
    else await submit();
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/teachers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error("fail");
      setDone(true);
    } catch {
      setError(w.error);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-white p-8 text-center shadow-lg">
        <SuccessCheck />
        <p className="text-lg font-semibold">{w.successTeacher}</p>
      </motion.div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-primary/5 sm:p-8">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>{w.step} {step + 1} {w.of} {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-accent to-primary" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold">{steps[step].title}</h3>
          <div className="space-y-4">{steps[step].fields}</div>
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-40">
          {w.back}
        </button>
        <button type="button" onClick={next} disabled={loading}
          className="rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.97] disabled:opacity-60">
          {loading ? w.submitting : step === steps.length - 1 ? w.submit : w.next}
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">{lang === "ar" ? "تحتاج مساعدة؟" : "Need help?"} <a href="https://wa.me/201000000000" className="text-primary hover:underline">WhatsApp</a></p>
    </div>
  );
}
