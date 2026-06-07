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

type JobSectionType = {
  t: TFunction<string, undefined>;
  lng: Language;
  onDelete: (index: number) => void;
  index: number;
};

const JobSection = ({ lng, t, index, onDelete }: JobSectionType) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "jalali",
  );
  const { setValue } = useFormContext();

  const countryWatch = useWatch({ name: `job.${index}.country`, exact: true });
  const provinceId = useWatch({ name: `job.${index}.province`, exact: true });
  const isIranSelected = countryWatch === "Iran";
  const isCurrentlyWorkingHere = useWatch({
    name: `job.${index}.isCurrentlyWorkingHere`,
    exact: true,
  });

  useEffect(() => {
    if (isCurrentlyWorkingHere) {
      setValue(`job.${index}.employmentEndMonth`, t("WorkingHere"));
      setValue(`job.${index}.employmentEndYear`, t("WorkingHere"));
    } else {
      setValue(`job.${index}.employmentEndMonth`, "");
      setValue(`job.${index}.employmentEndYear`, "");
    }
  }, [isCurrentlyWorkingHere, setValue, t, index]);

  const {
    degreeOptions,
    countryOptions,
    provinceOptions,
    cityOptions,
    monthOptions,
  } = useGetJobInfoStepData({
    t,
    lng,
    provinceId,
    calendarType,
  });
  return (
    <CustomResumeCardComponents calssName="grid grid-cols-12 gap-4">
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

      {/* Entry Month */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name={`job.${index}.entryMonth`}
          label={t("entryMonth")}
          options={monthOptions}
        />
      </div>

      {/* Entry Year */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`job.${index}.entryYear`}
          label={t("entryYear")}
        />
      </div>

      {/* Calendar Type */}
      <div className="col-span-12">
        <CustomRadio.Group className="flex flex-row">
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

      {/* employmentEndMonth */}
      <div className="col-span-12 md:col-span-6">
        {isCurrentlyWorkingHere ? (
          <CustomControlledInput
            name={`job.${index}.employmentEndMonth`}
            label={t("employmentEndMonth")}
            disabled={isCurrentlyWorkingHere}
          />
        ) : (
          <CustomControlledSelect
            name={`job.${index}.employmentEndMonth`}
            label={t("employmentEndMonth")}
            options={monthOptions}
            disabled={isCurrentlyWorkingHere}
          />
        )}
      </div>

      {/* employmentEndYear*/}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`job.${index}.employmentEndYear`}
          label={t("employmentEndYear")}
          disabled={isCurrentlyWorkingHere}
        />
      </div>

      {/* Current Working */}
      <div className="col-span-12">
        <div className="flex items-center justify-between">
          <CustomControlledCheckBox
            name={`job.${index}.isCurrentlyWorkingHere`}
            label={t("CurrentlyWorkingHere")}
          />
          {index !== 0 && (
            <CustomButton
              onClick={() => onDelete(index)}
              variant="outlined-negative"
            >
              {t("deleteThis")}
            </CustomButton>
          )}
        </div>
      </div>
    </CustomResumeCardComponents>
  );
};

export { JobSection };
