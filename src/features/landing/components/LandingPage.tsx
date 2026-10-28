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
    window.scrollTo(0, 0);
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
