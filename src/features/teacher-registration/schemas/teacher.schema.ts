import { z } from "zod";

export const teacherStep1Schema = z.object({
  fullName: z.string().min(1, "required"),
  phone: z.string().min(1, "required"),
});

export const teacherStep2Schema = z.object({
  subjects: z.string().min(1, "required"),
  levels: z.string().min(1, "required"),
  educationStage: z.string().min(1, "required"),
});

export const teacherStep3Schema = z.object({
  city: z.string().min(1, "required"),
  yearsExperience: z.string().optional(),
  availability: z.string().optional(),
});

export const teacherStep4Schema = z.object({
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  notes: z.string().optional(),
});

export const teacherSchema = teacherStep1Schema
  .merge(teacherStep2Schema)
  .merge(teacherStep3Schema)
  .merge(teacherStep4Schema);

export type TeacherFormValues = z.infer<typeof teacherSchema>;

export const TEACHER_STEP_KEYS = [
  Object.keys(teacherStep1Schema.shape) as (keyof TeacherFormValues)[],
  Object.keys(teacherStep2Schema.shape) as (keyof TeacherFormValues)[],
  Object.keys(teacherStep3Schema.shape) as (keyof TeacherFormValues)[],
  Object.keys(teacherStep4Schema.shape) as (keyof TeacherFormValues)[],
] as const;
