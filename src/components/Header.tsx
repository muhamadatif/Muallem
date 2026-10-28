"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  useEffect(() => {
    const sections = ["#top", "#how", "#need-teacher", "#be-teacher", "#faq"];
    function onScroll() {
      let current = "#top";
      for (const s of sections) {
        const el = document.querySelector(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = s;
        }
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#how", label: t.nav.how },
    { href: "#need-teacher", label: t.nav.needTeacher },
    { href: "#be-teacher", label: t.nav.beTeacher },
    { href: "#faq", label: t.nav.faq },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Image src={lang === "ar" ? "/logo-ar.svg" : "/logo.svg"} alt="" width={32} height={32} className="h-8 w-8" />
          {t.siteName}
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`rounded-full px-3 py-1.5 transition ${active === l.href ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}>{l.label}</a>
          ))}
          <button
            onClick={() => {
              const y = window.scrollY;
              setLang(lang === "ar" ? "en" : "ar");
              requestAnimationFrame(() => window.scrollTo(0, y));
            }}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            {t.nav.toggle}
          </button>
          <a href="#need-teacher" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark">
            {lang === "ar" ? "ابدأ" : "Start"}
          </a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => { const y = window.scrollY; setLang(lang === "ar" ? "en" : "ar"); requestAnimationFrame(() => window.scrollTo(0, y)); }} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">{t.nav.toggle}</button>
          <button onClick={() => setOpen(!open)} className="rounded p-2 text-primary" aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-white md:hidden">
          <div className="flex flex-col px-4 py-3 gap-3 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
