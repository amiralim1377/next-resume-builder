import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useCallback, useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

type CoursesCertificationsItemProps = {
  lng: Language;
  t: TFunction<string, undefined>;
  index: number;
};

const CoursesCertificationsItem = ({
  index,
  lng,
  t,
}: CoursesCertificationsItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "persian",
  );

  const handleSetPersian = useCallback(() => {
    setCalendarType("persian");
  }, []);

  const handleSetGregorian = useCallback(() => {
    setCalendarType("gregorian");
  }, []);

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
          placeholder={t("optional")}
        />
      </div>

      {/* Certificate URL (full width) */}
      <div className="col-span-1">
        <CustomControlledInput
          name={`coursesAndCertifications.${index}.certificateUrl`}
          label={t("certificateUrl")}
          placeholder={t("optional")}
        />
      </div>

      {/* Calendar Type (attached to date logically) */}
      <div className="col-span-2 flex items-end md:col-span-1">
        <CustomRadio.Group className="flex flex-row gap-4">
          <CustomRadio
            checked={calendarType === "persian"}
            onChange={handleSetPersian}
            label={t("solarHijri")}
          />

          <CustomRadio
            checked={calendarType === "gregorian"}
            onChange={handleSetGregorian}
            label={t("gregorian")}
          />
        </CustomRadio.Group>
      </div>
    </div>
  );
};

export { CoursesCertificationsItem };
