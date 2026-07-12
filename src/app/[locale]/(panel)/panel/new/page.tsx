"use client";
import { ResumeFormWrapper } from "@/features/resume/components/ResumeFormWrapper";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { getDefaultResumeValues } from "@/features/resume/utils/formDefaultResumeValues";

const NewResumePage = () => {
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
    <div className="flex w-full items-center justify-center p-6">
      <ResumeFormWrapper
        initialData={getDefaultResumeValues()}
        mode="create"
        onSubmit={handleFinalSubmit}
      />
    </div>
  );
};

export default NewResumePage;
