"use client";
import { FormStepperItem } from "@/components/ui/CustomFormStepperItem";
import { SectionState, StepName } from "../../types/resume.types";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { RESUME_STEPS } from "../../constants/steps";
import { calculateStepStatus } from "../../utils/stepper.utils";
import { useResumeFormContext } from "../ResumeFormProvider/ResumeFormContext";

const FormStepper = () => {
  const { handleStepClick, currentStep } = useResumeFormContext();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const formValues = useWatch({ control });

  const stepStatuses = useMemo((): Record<StepName, SectionState> => {
    const statuses = {} as Record<StepName, SectionState>;

    RESUME_STEPS.forEach((step, index) => {
      statuses[step.id] = calculateStepStatus({
        step,
        values: formValues,
        errors,
        index,
      });
    });

    return statuses;
  }, [formValues, errors]);

  console.log("stepStatuses:", stepStatuses);

  return (
    <div className="flex w-full justify-between">
      {RESUME_STEPS.map((step, index) => {
        const status = stepStatuses[step.id];

        const isActive = index === currentStep;
        const isCompleted = status === "completed";

        const isPending =
          !isActive && (status === "empty" || status === "draft");

        return (
          <FormStepperItem
            key={step.id}
            stepNumber={index + 1}
            title={step.titleKey}
            isActive={isActive}
            isCompleted={isCompleted}
            isPending={isPending}
            isLast={index === RESUME_STEPS.length - 1}
            onClick={() => handleStepClick(index)}
          />
        );
      })}
    </div>
  );
};

export { FormStepper };
