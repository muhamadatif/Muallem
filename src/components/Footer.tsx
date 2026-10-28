"use client";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-20 border-t border-border/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-bold text-primary">{t.siteName}</p>
            <p className="mt-2">{t.hero.subtitle}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">{t.footer.contact}</p>
            <p className="mt-2">WhatsApp: +20 102 498 8972</p>
            <p>Tel: +20 102 498 8972</p>
            <p>Email: hello@muallem.com</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">{t.footer.legal}</p>
            <p className="mt-2">{t.footer.privacy}</p>
          </div>
        </div>
        <p className="mt-8 text-center text-xs">© 2026 {t.siteName}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
