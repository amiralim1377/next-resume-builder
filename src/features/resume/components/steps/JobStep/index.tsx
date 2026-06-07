import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { JobSection } from "./components/JobSection";
import { useFieldArray } from "react-hook-form";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { CustomButton } from "@/components/ui/CustomButton";

function JobStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { fields, append, remove } = useFieldArray<ResumeFormValues, "job">({
    name: "job",
  });

  const onRowAdd = () => {
    append({
      summary: "",
      jobTitle: "",
      companyName: "",
      country: "",
      province: "",
      city: "",
      entryMonth: "",
      entryYear: "",
      employmentEndMonth: "",
      employmentEndYear: "",
      isCurrentlyWorkingHere: false,
    });
  };

  const onDelete = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex w-full flex-col space-y-8">
      {fields.map((field, index) => (
        <JobSection
          t={t}
          lng={lng}
          onDelete={onDelete}
          key={field.id}
          index={index}
        />
      ))}
      <CustomButton onClick={onRowAdd}>ADD</CustomButton>
    </div>
  );
}

export { JobStep };
