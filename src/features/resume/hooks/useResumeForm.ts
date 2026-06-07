import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { createResumeSchema, ResumeFormValues } from "../schemas/resume.schema";
import { getDefaultResumeValues } from "../utils/formDefaultResumeValues";
import { useLang } from "@/provider/lngProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@/lib/i18n/client";

export const useResumeForm = (
  initialData?: Partial<ResumeFormValues>,
  mode: "create" | "edit" = "create",
) => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const schema = useMemo(() => createResumeSchema(t), [t]);

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData || getDefaultResumeValues({ lng }),
    mode: "onChange",
    shouldUnregister: false,
    criteriaMode: "all",
  });

  const { trigger: triggerStep, reset } = form;

  useEffect(() => {
    if (initialData && mode === "edit") {
      reset(initialData, { keepDirtyValues: true });
    }
  }, [initialData, reset, mode]);

  return { form, triggerStep, ...form };
};
