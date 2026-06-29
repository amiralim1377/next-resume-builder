import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { Language } from "@/lib/i18n/settings";
import { CalendarType } from "@/types";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useGetJobInfoStepData } from "../../hooks/useGetJobInfoStepData";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { CustomControlledCheckBox } from "@/components/ui/CustomControlledCheckBox";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { JobSummary } from "../JobSummary";
import { RowStatusObserver } from "@/features/resume/components/RowStatusObserver";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";

type JobSectionType = {
  t: TFunction<string, undefined>;
  lng: Language;
  onDelete: (index: number) => void;
  index: number;
};

const JobItem = ({ lng, t, index, onDelete }: JobSectionType) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "persian",
  );
  const { setValue } = useFormContext();

  const countryWatch = useWatch({ name: `job.${index}.country`, exact: true });
  const provinceId = useWatch({ name: `job.${index}.province`, exact: true });
  const isCurrentlyWorkingHere = useWatch({
    name: `job.${index}.isCurrentlyWorkingHere`,
    exact: true,
  });
  const isIranSelected = countryWatch === "Iran";

  useEffect(() => {
    if (isCurrentlyWorkingHere) {
      setValue(`job.${index}.entryDate`, "");
      setValue(`job.${index}.employmentEndYearDate`, "");
    }
  }, [isCurrentlyWorkingHere, setValue, index]);

  const { countryOptions, provinceOptions, cityOptions } =
    useGetJobInfoStepData({
      lng,
      provinceId,
      calendarType,
    });
  return (
    <CustomResumeCardComponents
      classNames={{ cardClassName: "grid grid-cols-12 gap-4" }}
    >
      {/* Background worker tracking state changes cleanly */}
      <RowStatusObserver fieldName="job" index={index} />

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
          placeholder={
            isCurrentlyWorkingHere ? t("CurrentlyWorkingHere") : undefined
          }
          disabled={isCurrentlyWorkingHere}
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

      <CustomButton
        onClick={() => onDelete(index)}
        variant="outlined-negative"
        className="text-nowrap"
      >
        {t("deleteThis")}
      </CustomButton>
    </CustomResumeCardComponents>
  );
};

export { JobItem };
