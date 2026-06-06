import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { TFunction } from "i18next";
import { useGetEducationInfoStepData } from "../../hooks/useGetEducationInfoStepData";
import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { Language } from "@/lib/i18n/settings";
import { useFormContext, useWatch } from "react-hook-form";
import { CustomControlledCheckBox } from "@/components/ui/CustomControlledCheckBox";
import { useEffect, useState } from "react";
import { CustomRadio } from "@/components/ui/CustomRadio";

type EducationSectionProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

export type CalendarType = "jalali" | "gregorian";

const EducationSection = ({ t, lng }: EducationSectionProps) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    lng === "en" ? "gregorian" : "jalali",
  );

  const { setValue } = useFormContext();

  const countryWatch = useWatch({ name: "education.country", exact: true });
  const provinceId = useWatch({ name: "education.province", exact: true });
  const isIranSelected = countryWatch === "Iran";
  const isStudyingNow = useWatch({
    name: "education.isStudyingNow",
    exact: true,
  });

  useEffect(() => {
    if (isStudyingNow) {
      setValue("education.graduationMonth", t("isStudyingNow"));
      setValue("education.graduationYear", t("isStudyingNow"));
    } else {
      setValue("education.graduationMonth", "");
      setValue("education.graduationYear", "");
    }
  }, [isStudyingNow, setValue, t]);

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
    <CustomResumeCardComponents calssName="grid grid-cols-12 gap-3">
      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name="education.degreeLevel"
          label={t("degree")}
          options={degreeOptions}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name="education.academicMajor"
          label={t("major")}
        />
      </div>

      {/* Concentration */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name="education.concentration"
          label={t("concentration")}
        />{" "}
      </div>

      {/* Institution */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name="education.institutionName"
          label={t("institutionName")}
        />{" "}
      </div>

      {/* GPA */}
      <div className="col-span-12 md:col-span-3">
        <CustomControlledInput
          name="education.gradeAverage"
          label={t("gradeAverage")}
        />{" "}
      </div>

      {/* Country */}
      <div className="col-span-12 md:col-span-3">
        <CustomControlledSelect
          options={countryOptions}
          label={t("country")}
          name="education.country"
        />{" "}
      </div>

      {/* Province */}
      <div className="col-span-12 md:col-span-3">
        {isIranSelected ? (
          <CustomControlledSelect
            options={provinceOptions}
            label={t("province")}
            name="education.province"
            disabled={countryWatch === undefined}
          />
        ) : (
          <CustomControlledInput
            name="education.province"
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
            name="education.city"
            label={t("city")}
            options={cityOptions}
            disabled={provinceId === undefined}
          />
        ) : (
          <CustomControlledInput
            name="education.city"
            label={t("city")}
            disabled={countryWatch === undefined || countryWatch === ""}
          />
        )}
      </div>

      {/* Entry Month */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledSelect
          name="education.entryMonth"
          label={t("entryMonth")}
          options={monthOptions}
        />
      </div>

      {/* Entry Year */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name="education.entryYear"
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
            name="education.graduationMonth"
            label={t("graduationMonth")}
            disabled={isStudyingNow}
          />
        ) : (
          <CustomControlledSelect
            name="education.graduationMonth"
            label={t("graduationMonth")}
            options={monthOptions}
            disabled={isStudyingNow}
          />
        )}
      </div>

      {/* Graduation Year */}
      <div className="col-span-12 md:col-span-6">
        <CustomControlledInput
          name="education.graduationYear"
          label={t("graduationYear")}
          disabled={isStudyingNow}
        />
      </div>

      {/* Studying Now */}
      <div className="col-span-12">
        <CustomControlledCheckBox
          name="education.isStudyingNow"
          label={t("isStudyingNow")}
        />
      </div>
    </CustomResumeCardComponents>
  );
};

export { EducationSection };
