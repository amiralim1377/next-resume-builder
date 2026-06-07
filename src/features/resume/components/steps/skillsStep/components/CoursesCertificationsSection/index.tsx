import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";

type CoursesCertificationsSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const CoursesCertificationsSection =
  ({}: CoursesCertificationsSectionProps) => {
    return (
      <CustomResumeCardComponents>
        CoursesCertificationsSection
      </CustomResumeCardComponents>
    );
  };

export { CoursesCertificationsSection };
