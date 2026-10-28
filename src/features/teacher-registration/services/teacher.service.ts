import api from "@/lib/http/client";
import type { TeacherFormValues } from "../schemas/teacher.schema";

export const createTeacher = async (payload: TeacherFormValues) => {
  const res = await api.post("/api/teachers", payload);
  return res.data;
};
