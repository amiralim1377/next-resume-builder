import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { memo, useCallback, useEffect, useState } from "react";
import { useGetJobInfoStepData } from "../../hooks/useGetJobInfoStepData";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { CustomControlledCheckBox } from "@/components/ui/CustomControlledCheckBox";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { JobSummary } from "../JobSummary";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

type JobSectionType = {
  t: TFunction<string, undefined>;
  lng: Language;
  index: number;
};

const JobItemComponent = ({ lng, t, index }: JobSectionType) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "persian",
  );
  const { setValue, clearErrors, trigger } = useFormContext();

  const countryWatch = useWatch({ name: `job.${index}.country`, exact: true });
  const provinceId = useWatch({ name: `job.${index}.province`, exact: true });
  const isCurrentlyWorkingHere = useWatch({
    name: `job.${index}.isCurrentlyWorkingHere`,
    exact: true,
  });
  const isIranSelected = countryWatch === "Iran";

  useEffect(() => {
    const field = `job.${index}.employmentEndYearDate` as const;

    if (isCurrentlyWorkingHere) {
      setValue(field, "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      clearErrors(field);
    } else {
      trigger(`job.${index}`);
    }
  }, [isCurrentlyWorkingHere, index, setValue, trigger, clearErrors]);

  const { countryOptions, provinceOptions, cityOptions } =
    useGetJobInfoStepData({
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
      {/* Job Title */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`job.${index}.jobTitle` as const}
          label={t("jobTitleRole")}
        />
      </div>
      {/* Company Name */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`job.${index}.companyName`}
          label={t("companyName")}
        />
      </div>

      {/* Country */}
      <div className="col-span-12 md:col-span-4">
        <CustomControlledSelect
          options={countryOptions}
          label={t("country")}
          name={`job.${index}.country`}
        />
      </div>
      {/* Province */}
      <div className="col-span-12 md:col-span-4">
        {isIranSelected ? (
          <CustomControlledSelect
            options={provinceOptions}
            label={t("province")}
            name={`job.${index}.province`}
            disabled={countryWatch === undefined}
          />
        ) : (
          <CustomControlledInput
            name={`job.${index}.province`}
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
      <div className="col-span-12 md:col-span-4">
        {isIranSelected ? (
          <CustomControlledSelect
            name={`job.${index}.city`}
            label={t("city")}
            options={cityOptions}
            disabled={provinceId === undefined}
          />
        ) : (
          <CustomControlledInput
            name={`job.${index}.city`}
            label={t("city")}
            disabled={countryWatch === undefined || countryWatch === ""}
          />
        )}
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledCalendar
          name={`job.${index}.entryDate`}
          label={t("jobStartDate")}
          className=""
          calendarSystem={calendarType}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledCalendar
          name={`job.${index}.employmentEndYearDate`}
          label={t("jobEndDate")}
          className=""
          calendarSystem={calendarType}
          placeholder={
            isCurrentlyWorkingHere ? t("CurrentlyWorkingHere") : undefined
          }
          disabled={isCurrentlyWorkingHere}
        />
      </div>

      {/* Calendar Type */}
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

      {/* Current Working */}
      <div className="col-span-12">
        <div className="flex items-center justify-between">
          <CustomControlledCheckBox
            name={`job.${index}.isCurrentlyWorkingHere`}
            label={t("CurrentlyWorkingHere")}
          />
        </div>
      </div>

      {/* job summary */}
      <div className="col-span-12">
        <JobSummary index={index} t={t} />
      </div>
    </div>
  );
};

export const JobItem = memo(JobItemComponent);
