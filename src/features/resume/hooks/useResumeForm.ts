import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ResumeFormValues, resumeSchema } from "../schemas/resume.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultResumeValues } from "../utils/form.utils";
import { useLang } from "@/provider/lngProvider";

export const useResumeForm = (
  initialData?: Partial<ResumeFormValues>,
  mode: "create" | "edit" = "create",
) => {
  const { lng } = useLang();
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData || getDefaultResumeValues({ lng }),
    mode: "onBlur",
    shouldUnregister: false,
    criteriaMode: "all",
  });

  const {
    trigger: triggerStep,
    reset,
    formState: { errors, isDirty },
  } = form;

  useEffect(() => {
    if (initialData && mode === "edit") {
      reset(initialData, { keepDirtyValues: true });
    }
  }, [initialData, reset, mode]);

  return { form, triggerStep, ...form };
};
