import { z } from "zod";

export const schoolStep1Schema = z.object({
  schoolName: z.string().min(1, "required"),
  schoolType: z.string().optional(),
  city: z.string().min(1, "required"),
  contactPerson: z.string().optional(),
  phone: z.string().min(1, "required"),
  email: z.string().optional(),
});

export const schoolStep2Schema = z.object({
  subject: z.string().min(1, "required"),
  level: z.string().min(1, "required"),
  educationStage: z.string().min(1, "required"),
  location: z.string().min(1, "required"),
});

export const schoolStep3Schema = z.object({
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  requirements: z.string().optional(),
  notes: z.string().optional(),
});

export const schoolSchema = schoolStep1Schema
  .merge(schoolStep2Schema)
  .merge(schoolStep3Schema);

export type SchoolFormValues = z.infer<typeof schoolSchema>;

export const SCHOOL_STEP_KEYS = [
  Object.keys(schoolStep1Schema.shape) as (keyof SchoolFormValues)[],
  Object.keys(schoolStep2Schema.shape) as (keyof SchoolFormValues)[],
  Object.keys(schoolStep3Schema.shape) as (keyof SchoolFormValues)[],
] as const;
