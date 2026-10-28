"use client";

import CountUp from "@/components/CountUp";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  const { t, lang } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -z-10 top-16 end-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -30, 0], y: [0, 36, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -z-10 bottom-10 start-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t.hero.badge}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {t.hero.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#need-teacher"
              className="rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#be-teacher"
              className="rounded-full border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary/5"
            >
              {t.hero.cta2}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span>✓ {t.hero.s1}</span>
            <span>✓ {t.hero.s2}</span>
            <span>✓ {t.hero.s3}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-[2.5rem] border-2 border-dashed border-primary/20"
          />
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0 round 24px)" }}
            animate={{ clipPath: "inset(0 0% 0 0 round 24px)" }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/15"
          >
            <motion.img
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: "easeOut" }}
              src="/images/school-2.webp"
              alt="Smiling school children sitting in a classroom"
              className="h-[480px] w-full object-cover"
              loading="eager"
            />
          </motion.div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-lg">
            <p className="text-xs text-muted-foreground">{t.hero.matched}</p>
            <p className="text-2xl font-bold text-primary">
              <CountUp to={12} /> {lang === "ar" ? "معلماً" : "teachers"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
