"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FaqAccordion({ items }: { items: string[][] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map(([question, answer], i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={question}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={`rounded-2xl border bg-background transition-[border-color,box-shadow] duration-300 ${
              isOpen
                ? "border-primary/40 shadow-md"
                : "border-border shadow-sm hover:border-primary/30"
            }`}
          >
            <button
              type="button"
              id={`faq-btn-${i}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-start font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                    isOpen
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {i + 1}
                </span>
                {question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg leading-none text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>

            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-5 pb-5 ps-16 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300 ${
                    isOpen ? "opacity-100 delay-75" : "opacity-0"
                  }`}
                >
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
