import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { TFunction } from "i18next";
import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomControlledCheckBox } from "@/components/ui/CustomControlledCheckBox";
import { memo, useEffect, useState, useCallback } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CalendarType } from "@/types";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { useGetEducationInfoStepData } from "../../hooks/useGetEducationInfoStepData";
import { EducationSummary } from "../EducationSummary";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

type EducationItemProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  index: number;
};

const EducationItemComponent = ({ t, lng, index }: EducationItemProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "persian",
  );

  const { setValue, clearErrors, trigger } = useFormContext<ResumeFormValues>();

  const countryWatch = useWatch({
    name: `education.${index}.country`,
  });
  const provinceId = useWatch({ name: `education.${index}.province` });
  const isStudyingNow = useWatch({
    name: `education.${index}.isStudyingNow`,
  });

  const isIranSelected = countryWatch === "Iran";

  useEffect(() => {
    const field = `education.${index}.graduationDate` as const;

    if (isStudyingNow) {
      setValue(field, "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      clearErrors(field);
    } else {
      trigger(field);
    }
  }, [isStudyingNow, index, setValue, trigger, clearErrors]);

  const { degreeOptions, countryOptions, provinceOptions, cityOptions } =
    useGetEducationInfoStepData({
      t,
      lng,
      provinceId,
      calendarType,
    });

  const handleSetPersian = useCallback(() => {
    setCalendarType("persian");
  }, []);

  const handleSetGregorian = useCallback(() => {
    setCalendarType("gregorian");
  }, []);

  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name={`education.${index}.degreeLevel`}
          label={t("degree")}
          options={degreeOptions}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.academicMajor`}
          label={t("major")}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.concentration`}
          label={t("concentration")}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.institutionName`}
          label={t("institutionName")}
        />
      </div>

      <div className="col-span-12 md:col-span-3">
        <CustomControlledInput
          name={`education.${index}.gradeAverage`}
          label={t("gradeAverage")}
        />
      </div>

      <div className="col-span-12 md:col-span-3">
        <CustomControlledSelect
          options={countryOptions}
          label={t("country")}
          name={`education.${index}.country`}
        />
      </div>

      <div className="col-span-12 md:col-span-3">
        {isIranSelected ? (
          <CustomControlledSelect
            options={provinceOptions}
            label={t("province")}
            name={`education.${index}.province`}
            disabled={!countryWatch}
          />
        ) : (
          <CustomControlledInput
            name={`education.${index}.province`}
            label={t("province")}
            disabled={!countryWatch}
          />
        )}
      </div>

      <div className="col-span-12 md:col-span-3">
        {isIranSelected ? (
          <CustomControlledSelect
            name={`education.${index}.city`}
            label={t("city")}
            options={cityOptions}
            disabled={!provinceId || !countryWatch}
          />
        ) : (
          <CustomControlledInput
            name={`education.${index}.city`}
            label={t("city")}
            disabled={!countryWatch}
          />
        )}
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledCalendar
          name={`education.${index}.entryDate`}
          label={t("educationEntryDate")}
          className=""
          calendarSystem={calendarType}
          placeholder={t("educationEntryDatePlaceholder")}
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

      <div className="col-span-12">
        <CustomRadio.Group className="flex flex-row">
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

      <div className="col-span-12">
        <div className="flex items-center justify-between">
          <CustomControlledCheckBox
            name={`education.${index}.isStudyingNow`}
            label={t("isStudyingNow")}
          />
        </div>
      </div>

      <div className="col-span-12">
        <EducationSummary index={index} t={t} />
      </div>
    </div>
  );
};

export const EducationItem = memo(EducationItemComponent);
