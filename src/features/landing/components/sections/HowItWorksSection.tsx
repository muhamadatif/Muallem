"use client";

import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const icons = [
  <svg
    key="1"
    viewBox="0 0 48 48"
    className="h-12 w-12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="8" y="10" width="32" height="28" rx="4" />
    <path d="M16 18h16M16 26h10" />
  </svg>,
  <svg
    key="2"
    viewBox="0 0 48 48"
    className="h-12 w-12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 36 L24 12 L36 36" />
    <path d="M18 28h12" />
  </svg>,
];

export default function HowItWorksSection() {
  const { t } = useLang();

  return (
    <section
      id="how"
      className="relative overflow-hidden min-h-screen flex flex-col justify-center py-20"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/poster.jpg"
        src="/videos/kids-classroom.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center text-3xl font-bold text-white"
        >
          {t.how.title}
        </motion.h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-white/80">
          {t.how.subtitle}
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {t.how.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
              className="flex flex-col items-center text-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-white"
              >
                {icons[i]}
              </motion.div>
              <h3 className="text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm text-white/80">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
