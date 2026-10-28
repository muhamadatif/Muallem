"use client";

import TeacherWizard from "@/features/teacher-registration/components/TeacherWizard";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BeTeacherSection() {
  const { t } = useLang();

  return (
    <section
      id="be-teacher"
      className="min-h-screen flex flex-col justify-center py-16 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="lg:sticky lg:top-24"
        >
          <h2 className="text-3xl font-bold">{t.beTeacher.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.beTeacher.subtitle}</p>
          <img
            src="/images/teacher.webp"
            alt="Teacher in classroom"
            className="mt-6 h-78 w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </motion.div>
        <div>
          <TeacherWizard />
        </div>
      </div>
    </section>
  );
}
