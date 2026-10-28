"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const stages = ["Nursery", "Primary", "Prep", "Secondary", "College"];

export default function BeTeacherForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (!data.fullName || !data.phone || !data.subjects || !data.levels || !data.educationStage || !data.city) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/teachers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
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
      {done && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">Thanks! Your profile was submitted. We will verify and publish it within 24 hours.</div>}
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="fullName" placeholder="Full name *" required />
        <Field name="phone" placeholder="Phone (+20...) *" required />
        <Field name="email" placeholder="Email" type="email" />
        <Field name="city" placeholder="City / area *" required />
      </div>
      <Field name="subjects" placeholder="Subjects you teach (comma separated) *" required />
      <Field name="levels" placeholder="Levels / years (comma separated) *" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select name="educationStage" required options={stages} placeholder="Education stage *" />
        <Select name="availability" options={["Immediate", "Within 1 month", "Within 3 months"]} placeholder="Availability" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="yearsExperience" placeholder="Years of experience" type="number" />
        <Field name="salaryMin" placeholder="Expected salary min (EGP)" type="number" />
      </div>
      <Field name="salaryMax" placeholder="Expected salary max (EGP)" type="number" />
      <textarea name="notes" rows={3} placeholder="Anything else (optional)" className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <button disabled={loading} className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60">
        {loading ? "Submitting..." : "Register as a teacher"}
      </button>
    </motion.form>
  );
}

function Field({ name, placeholder, type = "text", required = false }: { name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
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
