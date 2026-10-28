import api from "@/lib/http/client";

export const loginAdmin = async (password: string) => {
  const res = await api.post("/api/auth/login", { password });
  return res.status === 200 || res.data === true || res.data?.ok;
};
