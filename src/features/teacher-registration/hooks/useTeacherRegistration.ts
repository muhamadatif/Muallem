"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { teacherSchema, TEACHER_STEP_KEYS, type TeacherFormValues } from "../schemas/teacher.schema";
import { createTeacher } from "../services/teacher.service";

export const useTeacherRegistration = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      subjects: "",
      levels: "",
      educationStage: "",
      city: "",
      yearsExperience: "",
      availability: "",
      salaryMin: "",
      salaryMax: "",
      notes: "",
    } as Partial<TeacherFormValues>,
  });

  const mutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => setDone(true),
  });

  const next = async () => {
    const keys = TEACHER_STEP_KEYS[step];
    if (keys && keys.length > 0) {
      const isValid = await form.trigger(keys as any);
      if (!isValid) return;
    }
    if (step < TEACHER_STEP_KEYS.length - 1) {
      setStep((s) => s + 1);
    } else {
      mutation.mutate(form.getValues());
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  return {
    form,
    step,
    next,
    back,
    done,
    isSubmitting: mutation.isPending,
    error: mutation.isError,
  };
};
