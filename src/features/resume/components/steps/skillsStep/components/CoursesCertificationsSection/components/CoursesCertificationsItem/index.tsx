import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useState } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

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
    lng === "en" ? "gregorian" : "persian",
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Title */}
      <div className="col-span-2 md:col-span-1">
        <CustomControlledInput
          name={`coursesAndCertifications.${index}.coursesAndCertificationsName`}
          label={t("coursesAndCertificationsName")}
          placeholder={t("courseOrCertificationTitle")}
        />
      </div>

      {/* Institute */}
      <div className="col-span-2 md:col-span-1">
        <CustomControlledInput
          name={`coursesAndCertifications.${index}.instituteName`}
          label={t("instituteName")}
        />
      </div>

      {/* Certificate Issue Date */}
      <div className="col-span-2 md:col-span-1">
        <CustomControlledCalendar
          name={`coursesAndCertifications.${index}.certificateIssueDate`}
          label={t("certificateIssueDate")}
        />
      </div>

      {/* Certificate URL (full width) */}
      <div className="col-span-1">
        <CustomControlledInput
          name={`coursesAndCertifications.${index}.certificateUrl`}
          label={t("certificateUrl")}
        />
      </div>

      {/* Calendar Type (attached to date logically) */}
      <div className="col-span-2 flex items-end md:col-span-1">
        <CustomRadio.Group className="flex flex-row gap-4">
          <CustomRadio
            checked={calendarType === "persian"}
            onChange={() => setCalendarType("persian")}
            label={t("solarHijri")}
          />

          <CustomRadio
            checked={calendarType === "gregorian"}
            onChange={() => setCalendarType("gregorian")}
            label={t("gregorian")}
          />
        </CustomRadio.Group>
      </div>

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
