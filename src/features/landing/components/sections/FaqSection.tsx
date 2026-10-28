"use client";

import FaqAccordion from "@/components/FaqAccordion";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FaqSection() {
  const { t, lang } = useLang();

  return (
    <section
      id="faq"
      className="relative bg-white min-h-screen flex flex-col justify-center py-16"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {lang === "ar" ? "الأسئلة" : "FAQ"}
          </span>
          <h2 className="mt-4 text-4xl font-bold">{t.faq.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {lang === "ar"
              ? "إجابات على أكثر الأسئلة شيوعاً"
              : "Answers to the most common questions"}
          </p>
        </motion.div>
        <div className="mt-10">
          <FaqAccordion items={t.faq.items} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
            💬
          </div>
          <p className="text-sm text-muted-foreground">
            {lang === "ar" ? "لم تجد إجابة؟" : "Didn't find an answer?"}
          </p>
          <a
            href="https://wa.me/201024988972"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            {lang === "ar" ? "تواصل معنا" : "Contact us"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
