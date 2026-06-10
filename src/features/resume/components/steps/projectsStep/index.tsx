import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useFieldArray } from "react-hook-form";
import { ProjectItem } from "./components/ProjectItem";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";

function ProjectsStep() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");

  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "projects"
  >({
    name: "projects",
  });

  const onRowAdd = () => {
    append({
      clientName: "",
      description: "",
      projectMonth: "",
      projectTitle: "",
      projectUrl: "",
      projectYear: "",
    });
  };
  return (
    <div>
      {fields.map((field, index) => (
        <CustomResumeCardComponents calssName="mt-2" key={field.id}>
          <ProjectItem lng={lng} t={t} index={index} onDelete={remove} />
        </CustomResumeCardComponents>
      ))}
      <CustomButton onClick={onRowAdd}>ADD</CustomButton>
    </div>
  );
}

export { ProjectsStep };
