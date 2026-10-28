"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../services/adminAuth.service";

export const useAdminAuth = () => {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      const ok = await loginAdmin(pwd);
      if (!ok) {
        setErr("Invalid password");
        return;
      }
      router.refresh();
    } catch {
      setErr("Invalid password");
    }
  }

  return { pwd, setPwd, err, submit };
};
