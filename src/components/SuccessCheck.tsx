"use client";
import { motion } from "framer-motion";

export default function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <motion.path
          d="M5 12.5l4.5 4.5L19 7.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        />
      </svg>
    </motion.div>
  );
}
