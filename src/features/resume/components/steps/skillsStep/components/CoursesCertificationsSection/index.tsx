import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useFieldArray } from "react-hook-form";
import { CoursesCertificationsItem } from "./components/CoursesCertificationsItem";
import { CustomButton } from "@/components/ui/CustomButton";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";

type CoursesCertificationsSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const CoursesCertificationsSection = ({
  lng,
  t,
}: CoursesCertificationsSectionProps) => {
  const { fields, append, remove } = useFieldArray<
    ResumeFormValues,
    "coursesAndCertifications"
  >({
    name: "coursesAndCertifications",
  });

  const addCoursesCertifications = () => {
    append({
      coursesAndCertificationsName: "",
      instituteName: "",
      certificateIssueMonth: "",
      certificateIssueYear: "",
      certificateUrl: "",
    });
  };

  return (
    <>
      {fields.map((field, index) => {
        return (
          <CustomResumeCardComponents key={field.id}>
            <CoursesCertificationsItem
              lng={lng}
              t={t}
              index={index}
              onDelete={remove}
            />
          </CustomResumeCardComponents>
        );
      })}

      <CustomButton
        className="my-4 w-full"
        type="button"
        onClick={addCoursesCertifications}
      >
        add
      </CustomButton>
    </>
  );
};

export { CoursesCertificationsSection };
