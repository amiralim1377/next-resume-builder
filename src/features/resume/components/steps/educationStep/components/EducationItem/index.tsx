import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { TFunction } from "i18next";
import { useGetEducationInfoStepData } from "../../hooks/useGetEducationInfoStepData";
import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomControlledCheckBox } from "@/components/ui/CustomControlledCheckBox";
import { useEffect, useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";
import { CustomButton } from "@/components/ui/CustomButton";
import { CalendarType } from "@/types";
import { EducationSummary } from "../EducationSummary";

type EducationItemnProps = {
  t: TFunction<string, undefined>;
  lng: Language;
  index: number;
  onDelete: (index: number) => void;
};

const EducationItem = ({ t, lng, index, onDelete }: EducationItemnProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "jalali",
  );

  const { setValue } = useFormContext();

  const countryWatch = useWatch({
    name: `education.${index}.country`,
    exact: true,
  });
  const provinceId = useWatch({
    name: `education.${index}.province`,
    exact: true,
  });
  const isIranSelected = countryWatch === "Iran";
  const isStudyingNow = useWatch({
    name: `education.${index}.isStudyingNow`,
    exact: true,
  });

  useEffect(() => {
    if (isStudyingNow) {
      setValue(`education.${index}.graduationMonth`, t("isStudyingNow"));
      setValue(`education.${index}.graduationYear`, t("isStudyingNow"));
    } else {
      setValue(`education.${index}.graduationMonth`, "");
      setValue(`education.${index}.graduationYear`, "");
    }
  }, [isStudyingNow, setValue, t, index]);

  const {
    degreeOptions,
    countryOptions,
    provinceOptions,
    cityOptions,
    monthOptions,
  } = useGetEducationInfoStepData({
    t,
    lng,
    provinceId,
    calendarType,
  });

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

      {/* Concentration */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.concentration`}
          label={t("concentration")}
        />{" "}
      </div>

      {/* Institution */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.institutionName`}
          label={t("institutionName")}
        />{" "}
      </div>

      {/* GPA */}
      <div className="col-span-12 md:col-span-3">
        <CustomControlledInput
          name={`education.${index}.gradeAverage`}
          label={t("gradeAverage")}
        />{" "}
      </div>

      {/* Country */}
      <div className="col-span-12 md:col-span-3">
        <CustomControlledSelect
          options={countryOptions}
          label={t("country")}
          name={`education.${index}.country`}
        />{" "}
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

      {/* Entry Month */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name={`education.${index}.entryMonth`}
          label={t("entryMonth")}
          options={monthOptions}
        />
      </div>

      {/* Entry Year */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.entryYear`}
          label={t("entryYear")}
        />
      </div>

      {/* btn  */}
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

      {/* Graduation Month */}
      <div className="col-span-12 md:col-span-6">
        {isStudyingNow ? (
          <CustomControlledInput
            name={`education.${index}.graduationMonth`}
            label={t("graduationMonth")}
            disabled={isStudyingNow}
          />
        ) : (
          <CustomControlledSelect
            name={`education.${index}.graduationMonth`}
            label={t("graduationMonth")}
            options={monthOptions}
            disabled={isStudyingNow}
          />
        )}
      </div>

      {/* Graduation Year */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name={`education.${index}.graduationYear`}
          label={t("graduationYear")}
          disabled={isStudyingNow}
        />
      </div>

      {/* Studying Now */}
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

      <CustomButton
        onClick={() => onDelete(index)}
        variant="outlined-negative"
        className="text-nowrap"
      >
        {t("deleteThis")}
      </CustomButton>
    </div>
  );
};

export { EducationItem };
