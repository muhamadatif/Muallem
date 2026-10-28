"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const stages = ["Nursery", "Primary", "Prep", "Secondary", "College"];

export default function NeedTeacherForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (!data.schoolName || !data.phone || !data.subject || !data.level || !data.educationStage || !data.location) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/vacancies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error("Failed");
      setDone(true);
      (e.target as HTMLFormElement).reset();
    } catch {
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-lg shadow-primary/5 sm:p-8"
    >
      {done && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">Vacancy submitted. We will review and publish it within 24 hours. We will contact you on WhatsApp.</div>}
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <p className="text-sm font-semibold text-foreground">School details</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="schoolName" placeholder="School name *" required />
        <Field name="schoolType" placeholder="Type (Private School / College / Nursery)" />
        <Field name="city" placeholder="City *" required />
        <Field name="contactPerson" placeholder="Contact person" />
        <Field name="phone" placeholder="Phone *" required />
        <Field name="email" placeholder="Email" type="email" />
      </div>
      <p className="pt-2 text-sm font-semibold text-foreground">Vacancy details</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="subject" placeholder="Subject *" required />
        <Field name="level" placeholder="Level / Year *" required />
        <Select name="educationStage" required options={stages} placeholder="Education stage *" />
        <Field name="location" placeholder="Job location *" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="salaryMin" placeholder="Salary min (EGP)" type="number" />
        <Field name="salaryMax" placeholder="Salary max (EGP)" type="number" />
      </div>
      <textarea name="requirements" rows={3} placeholder="Requirements (optional)" className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <button disabled={loading} className="w-full rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
        {loading ? "Submitting..." : "Submit vacancy"}
      </button>
    </motion.form>
  );
}

function Field({ name, placeholder, type = "text", required = false }: { name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <input name={name} type={type} required={required} placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
  );
}

function Select({ name, options, placeholder, required = false }: { name: string; options: string[]; placeholder: string; required?: boolean }) {
  return (
    <select name={name} required={required} className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
