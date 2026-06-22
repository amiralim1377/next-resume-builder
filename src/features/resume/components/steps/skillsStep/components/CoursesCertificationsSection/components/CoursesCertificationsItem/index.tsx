import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useState } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import { useGetSkillsInfoStepData } from "../../../../hooks/useGetSkillsInfoStepData";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CustomButton } from "@/components/ui/CustomButton";

type CoursesCertificationsItemProps = {
  lng: Language;
  t: TFunction<string, undefined>;
  index: number;
  onDelete: UseFieldArrayRemove;
};

const CoursesCertificationsItem = ({
  index,
  lng,
  onDelete,
  t,
}: CoursesCertificationsItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "jalali",
  );

  const { monthOptions } = useGetSkillsInfoStepData({ calendarType, lng });
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Title */}
      <CustomControlledInput
        name={`coursesAndCertifications.${index}.coursesAndCertificationsName`}
        label={t("coursesAndCertificationsName")}
        placeholder={t("courseOrCertificationTitle")}
      />

      {/* Institute */}
      <CustomControlledInput
        name={`coursesAndCertifications.${index}.instituteName`}
        label={t("instituteName")}
      />

      {/* Issue Month */}
      <CustomControlledSelect
        name={`coursesAndCertifications.${index}.certificateIssueMonth`}
        label={t("issueMonth")}
        options={monthOptions}
      />

      {/* Issue Year */}
      <CustomControlledInput
        name={`coursesAndCertifications.${index}.certificateIssueYear`}
        label={t("issueYear")}
        placeholder={t("issueYear")}
      />

      {/* Calendar Type (full width) */}
      <div className="col-span-2">
        <CustomRadio.Group className="flex flex-row gap-4">
          <CustomRadio
            checked={calendarType === "jalali"}
            onChange={() => setCalendarType("jalali")}
            label={t("solarHijri")}
          />

          <CustomRadio
            checked={calendarType === "gregorian"}
            onChange={() => setCalendarType("gregorian")}
            label={t("gregorian")}
          />
        </CustomRadio.Group>
      </div>

      {/* Certificate URL */}
      <CustomControlledInput
        className="col-span-2"
        name={`coursesAndCertifications.${index}.certificateUrl`}
        label={t("certificateUrl")}
        placeholder={t("certificateUrl")}
      />

      {/* Delete button */}

      <div className="col-span-2 flex justify-end">
        <CustomButton
          onClick={() => onDelete(index)}
          variant="outlined-negative"
        >
          {t("deleteThis")}
        </CustomButton>
      </div>
    </div>
  );
};

export { CoursesCertificationsItem };
