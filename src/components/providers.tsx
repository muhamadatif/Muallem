"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
