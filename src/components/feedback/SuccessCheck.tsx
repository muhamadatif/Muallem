"use client";

import { motion } from "framer-motion";

export default function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
    >
      <motion.svg
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-emerald-600"
      >
        <motion.path d="M20 6L9 17l-5-5" />
      </motion.svg>
    </motion.div>
  );
}
