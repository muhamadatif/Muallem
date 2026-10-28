"use client";

import SchoolWizard from "@/features/school-vacancy/components/SchoolWizard";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function NeedTeacherSection() {
  const { t } = useLang();

  return (
    <section
      id="need-teacher"
      className="bg-white min-h-screen flex flex-col justify-center py-16"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-2">
        <div>
          <SchoolWizard />
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="lg:sticky lg:top-24"
        >
          <h2 className="text-3xl font-bold">{t.needTeacher.title}</h2>
          <p className="mt-3 text-muted-foreground">
            {t.needTeacher.subtitle}
          </p>
          <img
            src="/images/hero-6.jpg"
            alt="School building"
            className="mt-6 h-[500px] w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
