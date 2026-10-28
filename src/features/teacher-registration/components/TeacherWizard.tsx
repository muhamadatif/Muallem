"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useTeacherRegistration } from "../hooks/useTeacherRegistration";
import StepPersonal from "./steps/StepPersonal";
import StepSubjects from "./steps/StepSubjects";
import StepLocation from "./steps/StepLocation";
import StepPreferences from "./steps/StepPreferences";
import SuccessCheck from "@/components/feedback/SuccessCheck";

const STEPS = [StepPersonal, StepSubjects, StepLocation, StepPreferences];
const TITLES = ["s1t", "s2t", "s3t", "s4t"] as const;

export default function TeacherWizard() {
  const { t, lang } = useLang();
  const tr = t.teacher;
  const w = t.wizard;
  const { form, step, next, back, done, isSubmitting, error } = useTeacherRegistration();

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-white p-8 text-center shadow-lg">
        <SuccessCheck />
        <p className="text-lg font-semibold">{w.successTeacher}</p>
      </motion.div>
    );
  }

  const StepComp = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-primary/5 sm:p-8">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>{w.step} {step + 1} {w.of} {STEPS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-accent to-primary" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">{tr[TITLES[step]]}</h3>
            <div className="space-y-4">
              <StepComp form={form} />
            </div>
          </motion.div>
        </AnimatePresence>

        {error && <p className="mt-3 text-sm text-destructive">{w.error}</p>}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" onClick={back} disabled={step === 0}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-40">
            {w.back}
          </button>
          <button type="submit" disabled={isSubmitting}
            className="rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.97] disabled:opacity-60">
            {isSubmitting ? w.submitting : step === STEPS.length - 1 ? w.submit : w.next}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-xs text-muted-foreground">{lang === "ar" ? "تحتاج مساعدة؟" : "Need help?"} <a href="https://wa.me/201024988972" className="text-primary hover:underline">WhatsApp</a></p>
    </div>
  );
}
