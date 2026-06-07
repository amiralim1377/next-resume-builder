import { useLang } from "@/provider/lngProvider";
import { EducationSection } from "./components/EducationSection";
import { useTranslation } from "@/lib/i18n/client";
import { CustomButton } from "@/components/ui/CustomButton";
import { useFieldArray } from "react-hook-form";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";

function EducationStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "education"
  >({
    name: "education",
  });

  const onRowAdd = () => {
    append({
      degreeLevel: "",
      academicMajor: "",
      concentration: "",
      institutionName: "",
      gradeAverage: "",
      country: "",
      province: "",
      city: "",
      entryMonth: "",
      entryYear: "",
      graduationMonth: "",
      graduationYear: "",
      isStudyingNow: false,
      summary: "",
    });
  };

  const onDelete = (index: number) => {
    remove(index);
  };
  return (
    <div className="flex w-full flex-col space-y-8">
      {fields.map((field, index) => (
        <EducationSection
          onDelete={onDelete}
          key={field.id}
          index={index}
          t={t}
          lng={lng}
        />
      ))}
      <CustomButton onClick={onRowAdd}>ADD</CustomButton>
    </div>
  );
}

export { EducationStep };
