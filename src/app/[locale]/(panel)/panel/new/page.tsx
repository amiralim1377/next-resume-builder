"use client";
import { ResumeFormProvider } from "@/features/resume/components/ResumeFormProvider";
import { getDefaultResumeValues } from "@/features/resume/utils/formDefaultResumeValues";
import { useLang } from "@/provider/lngProvider";

const NewResumePage = () => {
  const { lng } = useLang();
  return (
    <div>
      <ResumeFormProvider
        initialData={getDefaultResumeValues({ lng })}
        mode="create"
      />
    </div>
  );
};

export default NewResumePage;
