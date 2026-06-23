// src/features/resume/hooks/useResumeForm.ts
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createResumeSchema,
  type ResumeFormValues,
} from "../schemas/resume.schema";
import { getDefaultResumeValues } from "../utils/formDefaultResumeValues";
import { useLang } from "@/provider/lngProvider";
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
    defaultValues: initialData ?? getDefaultResumeValues({ lng }),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: false,
    criteriaMode: "all",
  });

  const { reset } = form;
  useEffect(() => {
    if (initialData && mode === "edit") {
      reset(initialData, { keepDirtyValues: true });
    }
  }, [initialData, reset, mode]);

  return form;
};
