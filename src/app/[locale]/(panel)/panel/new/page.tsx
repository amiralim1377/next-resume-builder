"use client";
import { ResumeFormProvider } from "@/features/resume/components/ResumeFormProvider";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { getDefaultResumeValues } from "@/features/resume/utils/formDefaultResumeValues";
import { useLang } from "@/provider/lngProvider";

const NewResumePage = () => {
  const { lng } = useLang();

  const handleFinalSubmit = async (data: ResumeFormValues) => {
    console.log("✅ Full Resume Data Submitted:", data);

    // TODO: Send to your API
    try {
      // const response = await fetch('/api/resumes', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });

      console.log("رزومه با موفقیت ذخیره شد!"); // Temporary
      console.log("Saved successfully");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div>
      <ResumeFormProvider
        initialData={getDefaultResumeValues({ lng })}
        mode="create"
        onSubmit={handleFinalSubmit}
      />
    </div>
  );
};

export default NewResumePage;
