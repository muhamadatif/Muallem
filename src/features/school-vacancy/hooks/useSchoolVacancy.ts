"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { schoolSchema, SCHOOL_STEP_KEYS, type SchoolFormValues } from "../schemas/school.schema";
import { createSchoolVacancy } from "../services/schoolVacancy.service";

export const useSchoolVacancy = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    mode: "onTouched",
    defaultValues: {
      schoolName: "",
      schoolType: "",
      city: "",
      contactPerson: "",
      phone: "",
      email: "",
      subject: "",
      level: "",
      educationStage: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
      requirements: "",
      notes: "",
    } as Partial<SchoolFormValues>,
  });

  const mutation = useMutation({
    mutationFn: createSchoolVacancy,
    onSuccess: () => setDone(true),
  });

  const next = async () => {
    const keys = SCHOOL_STEP_KEYS[step];
    if (keys && keys.length > 0) {
      const isValid = await form.trigger(keys as any);
      if (!isValid) return;
    }
    if (step < SCHOOL_STEP_KEYS.length - 1) {
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
