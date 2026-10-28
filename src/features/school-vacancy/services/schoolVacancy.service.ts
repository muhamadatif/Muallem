import api from "@/lib/http/client";
import type { SchoolFormValues } from "../schemas/school.schema";

export const createSchoolVacancy = async (payload: SchoolFormValues) => {
  const res = await api.post("/api/vacancies", payload);
  return res.data;
};
