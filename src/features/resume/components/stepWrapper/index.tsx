"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RESUME_STEPS } from "../../constants/steps";

const StepWrapper = ({ currentStep }: { currentStep: number }) => {
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
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className=""
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>
      {/* {Object.keys(errors).length > 0 && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
            لطفاً خطاهای زیر را برطرف کنید:
          </p>
        </div>
      )} */}
    </div>
  );
};

export default StepWrapper;
