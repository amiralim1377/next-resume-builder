import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useFieldArray } from "react-hook-form";
import { ResearchItem } from "./components/ResearchItem";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";

function ResearchStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "research"
  >({
    name: "research",
  });

  const onRowAdd = () => {
    append({
      publicationMonth: "",
      publicationYear: "",
      publisher: "",
      researchTitle: "",
      researchUrl: "",
    });
  };

  const onDelete = (index: number) => {
    remove(index);
  };

  return (
    <>
      <div className="flex w-full flex-col space-y-8">
        {fields.map((field, index) => (
          <CustomResumeCardComponents calssName="mt-2" key={field.id}>
            <ResearchItem
              t={t}
              lng={lng}
              onDelete={onDelete}
              key={field.id}
              index={index}
            />
          </CustomResumeCardComponents>
        ))}
      </div>
      <CustomButton onClick={onRowAdd}>ADD</CustomButton>
    </>
  );
}

export { ResearchStep };
