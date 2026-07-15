"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { get } from "idb-keyval";

import { ResumeStep } from "@/domain/dtos/resume.dto";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { useResumeForm } from "@/features/resume/hooks/useResumeForm";
import { RESUME_STEPS } from "@/features/resume/constants/steps";
import { normalizeFormData } from "@/features/resume/utils/data-normalizer";

export type UseResumeFormManagerProps = {
  initialData?: Partial<ResumeFormValues>;
  mode?: "create" | "edit";
  onSubmit?: (data: ResumeFormValues) => Promise<void>;
  onStepChange?: (step: ResumeStep, data: unknown) => void;
};

export type UseResumeFormManagerReturn = {
  form: UseFormReturn<ResumeFormValues>;
  currentStep: number;
  setCurrentStep: (index: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  handleNext: (e?: React.BaseSyntheticEvent) => void;
  handlePrev: () => void;
  handleStepClick: (index: number) => void;
  executeSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export const useResumeFormManager = ({
  initialData,
  mode = "create",
  onSubmit,
  onStepChange,
}: UseResumeFormManagerProps): UseResumeFormManagerReturn => {
  const form = useResumeForm(initialData, mode);
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === RESUME_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  const { reset } = form;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentStep]);

  // Restore draft from IndexedDB when creating
  useEffect(() => {
    const restoreDraftData = async () => {
      try {
        if (mode === "create") {
          const savedDraft = await get("current_resume_draft");
          if (savedDraft) {
            reset(savedDraft);
            console.log("🔄 Draft successfully restored from IndexedDB");
          }
        }
      } catch (error) {
        console.error("❌ Failed to restore draft from IndexedDB", error);
      }
    };

    restoreDraftData();
  }, [reset, mode]);

  const saveCurrentStepData = useCallback(() => {
    const currentStepConfig = RESUME_STEPS[currentStep];
    if (!currentStepConfig) return;

    const fieldsToSave = currentStepConfig.fieldNames;

    fieldsToSave.forEach((fieldKey) => {
      const rawData = form.getValues()[fieldKey as keyof ResumeFormValues];

      const safeData = normalizeFormData(rawData);

      if (rawData !== undefined) {
        onStepChange?.(fieldKey as ResumeStep, safeData);
      }
    });
  }, [currentStep, form, onStepChange]);

  const handleFormSubmit = useCallback(
    async (values: ResumeFormValues) => {
      try {
        await onSubmit?.(values);
        console.log("✅ Final Resume Data Submitted Successfully:", values);
      } catch (error) {
        console.error("❌ Submit failed:", error);
      }
    },
    [onSubmit],
  );

  const onInvalidSubmit = useCallback(
    (errors: FieldErrors<ResumeFormValues>) => {
      const firstErrorStepIndex = RESUME_STEPS.findIndex((step) =>
        step.fieldNames.some((fieldName) => errors[fieldName]),
      );

      if (firstErrorStepIndex !== -1 && firstErrorStepIndex !== currentStep) {
        setTimeout(() => {
          setCurrentStep(firstErrorStepIndex);
        }, 100);
        console.warn(
          `Redirected to step ${firstErrorStepIndex + 1} due to validation errors.`,
        );
      }
    },
    [currentStep],
  );

  const handleNext = useCallback(
    (e?: React.BaseSyntheticEvent) => {
      saveCurrentStepData();

      if (isLastStep) {
        form.handleSubmit(handleFormSubmit, onInvalidSubmit)(e);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    },
    [isLastStep, form, handleFormSubmit, onInvalidSubmit, saveCurrentStepData],
  );

  const handlePrev = useCallback(() => {
    saveCurrentStepData();

    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, [saveCurrentStepData]);

  const handleStepClick = useCallback(
    (targetIndex: number) => {
      saveCurrentStepData();

      setCurrentStep(targetIndex);
    },
    [saveCurrentStepData],
  );

  const executeSubmit = form.handleSubmit(handleFormSubmit, onInvalidSubmit);

  return {
    form,
    currentStep,
    setCurrentStep,
    isLastStep,
    isFirstStep,
    handleNext,
    handlePrev,
    handleStepClick,
    executeSubmit,
  };
};
