import { useFormContext } from "react-hook-form";
import { ResumeFormValues } from "../schemas/resume.schema";
import { RESUME_STEPS } from "../constants/steps";

const useStepValidation = (currentStepId: string) => {
  const { trigger } = useFormContext<ResumeFormValues>();

  const validateStep = async () => {
    const currentStepConfig = RESUME_STEPS.find(
      (step) => step.id === currentStepId,
    );
    if (!currentStepConfig) {
      console.error(`Step configuration not found for id: ${currentStepId}`);
      return false;
    }

    const fieldsToValidate = currentStepConfig.fieldNames;

    // eslint-disable-next-line
    const isValid = await trigger(fieldsToValidate as any);

    return isValid;
  };

  return { validateStep };
};

export { useStepValidation };
