import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { TFunction } from "i18next";
import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomControlledCheckBox } from "@/components/ui/CustomControlledCheckBox";
import { memo, useEffect, useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CustomButton } from "@/components/ui/CustomButton";
import { CalendarType } from "@/types";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { RowStatusObserver } from "@/features/resume/components/RowStatusObserver";
import { useGetEducationInfoStepData } from "../../hooks/useGetEducationInfoStepData";
import { EducationSummary } from "../EducationSummary";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

type EducationItemProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  index: number;
  onDelete: (index: number) => void;
};

const EducationItemComponent = ({
  t,
  lng,
  index,
  onDelete,
}: EducationItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "persian",
  );

  const { setValue } = useFormContext<ResumeFormValues>();
  const countryWatch = useWatch({
    name: `education.${index}.country`,
  });
  const provinceId = useWatch({ name: `education.${index}.province` });
  const isStudyingNow = useWatch({
    name: `education.${index}.isStudyingNow`,
  });
  const isIranSelected = countryWatch === "Iran";

  useEffect(() => {
    if (isStudyingNow) {
      setValue(`education.${index}.entryDate`, "");
      setValue(`education.${index}.graduationDate`, "");
    }
  }, [isStudyingNow, index, setValue]);

  const { degreeOptions, countryOptions, provinceOptions, cityOptions } =
    useGetEducationInfoStepData({
      t,
      lng,
      provinceId,
      calendarType,
    });

  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Background worker tracking state changes cleanly */}
      <RowStatusObserver fieldName="education" index={index} />

      {/* Degree Level */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name={`education.${index}.degreeLevel`}
          label={t("degree")}
          options={degreeOptions}
        />
      </div>

      {/* Academic Major */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.academicMajor`}
          label={t("major")}
        />
      </div>

      {/* Concentration */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.concentration`}
          label={t("concentration")}
        />
      </div>

      {/* Institution Name */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.institutionName`}
          label={t("institutionName")}
        />
      </div>

      {/* GPA */}
      <div className="col-span-12 md:col-span-3">
        <CustomControlledInput
          name={`education.${index}.gradeAverage`}
          label={t("gradeAverage")}
        />
      </div>

      {/* Country */}
      <div className="col-span-12 md:col-span-3">
        <CustomControlledSelect
          options={countryOptions}
          label={t("country")}
          name={`education.${index}.country`}
        />
      </div>

      {/* Province */}
      <div className="col-span-12 md:col-span-3">
        {isIranSelected ? (
          <CustomControlledSelect
            options={provinceOptions}
            label={t("province")}
            name={`education.${index}.province`}
            disabled={countryWatch === undefined}
          />
        ) : (
          <CustomControlledInput
            name={`education.${index}.province`}
            label={t("province")}
            disabled={
              countryWatch === undefined ||
              countryWatch === "" ||
              !Boolean(countryWatch)
            }
          />
        )}
      </div>

      {/* City */}
      <div className="col-span-12 md:col-span-3">
        {isIranSelected ? (
          <CustomControlledSelect
            name={`education.${index}.city`}
            label={t("city")}
            options={cityOptions}
            disabled={provinceId === undefined}
          />
        ) : (
          <CustomControlledInput
            name={`education.${index}.city`}
            label={t("city")}
            disabled={countryWatch === undefined || countryWatch === ""}
          />
        )}
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledCalendar
          name={`education.${index}.entryDate`}
          label={t("educationEntryDate")}
          className=""
          calendarSystem={calendarType}
          placeholder={
            isStudyingNow
              ? t("isStudyingNow")
              : t("educationEntryDatePlaceholder")
          }
          disabled={isStudyingNow}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <CustomControlledCalendar
          name={`education.${index}.graduationDate`}
          label={t("graduationDate")}
          placeholder={
            isStudyingNow ? t("isStudyingNow") : t("graduationDatePlaceholder")
          }
          disabled={isStudyingNow}
          calendarSystem={calendarType}
        />
      </div>

      {/* Calendar Switcher */}
      <div className="col-span-12">
        <CustomRadio.Group className="flex flex-row">
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

      {/* Studying Now Checkbox */}
      <div className="col-span-12">
        <div className="flex items-center justify-between">
          <CustomControlledCheckBox
            name={`education.${index}.isStudyingNow`}
            label={t("isStudyingNow")}
          />
        </div>
      </div>

      {/* Summary Field */}
      <div className="col-span-12">
        <EducationSummary index={index} t={t} />
      </div>

      {/* Actions */}
      <div className="col-span-12 flex justify-end">
        <CustomButton
          onClick={() => onDelete(index)}
          variant="outlined-negative"
          className="text-nowrap"
        >
          {t("deleteThis")}
        </CustomButton>
      </div>
    </div>
  );
};

export const EducationItem = memo(EducationItemComponent);
