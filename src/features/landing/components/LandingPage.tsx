"use client";

import { useEffect } from "react";
import HeroSection from "./sections/HeroSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import NeedTeacherSection from "./sections/NeedTeacherSection";
import BeTeacherSection from "./sections/BeTeacherSection";
import FaqSection from "./sections/FaqSection";

export default function LandingPage() {
  useEffect(() => {
    if ("scrollRestoration" in window.history)
      window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const header = document.querySelector("header");
      const offset = (header?.getBoundingClientRect().height || 80) + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div id="top" className="overflow-hidden">
      <HeroSection />
      <HowItWorksSection />
      <NeedTeacherSection />
      <BeTeacherSection />
      <FaqSection />
    </div>
  );
}
