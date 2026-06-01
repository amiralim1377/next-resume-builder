"use client";

import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeFormValues } from "../../schemas/resume.schema";
import { RESUME_STEPS } from "../../constants/steps";

const StepWrapper = ({ currentStep }: { currentStep: number }) => {
  const {
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  const stepConfig = RESUME_STEPS[currentStep];

  if (!stepConfig) {
    return (
      <div className="p-8 text-center text-red-500">
        Step not found. Please check your steps configuration.
      </div>
    );
  }

  const StepComponent = stepConfig.component;

  if (!StepComponent) {
    return <div>Component for this step is not defined.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          {stepConfig.icon && (
            <span className="text-3xl">{stepConfig.icon}</span>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stepConfig.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Step {currentStep + 1} of {RESUME_STEPS.length}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>

      {Object.keys(errors).length > 0 && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
            لطفاً خطاهای زیر را برطرف کنید:
          </p>
        </div>
      )}
    </div>
  );
};

export default StepWrapper;
