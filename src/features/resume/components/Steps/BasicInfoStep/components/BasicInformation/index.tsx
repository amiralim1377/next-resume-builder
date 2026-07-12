import { useGetBasicInfoStepData } from "../../hooks/useGetBasicInfoStepData";
import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
import { CustomControlledCalendar } from "@/components/ui/CustomControlledCalendar";
import { CalendarType } from "@/types";
import { memo, useMemo } from "react";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";

const BasicInformationComponent = () => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { maritalOptions, militaryOptions, sexOptions } =
    useGetBasicInfoStepData({ t, lng });

  const calendarType: CalendarType = useMemo(
    () => (lng === "fa" ? "persian" : "gregorian"),
    [lng],
  );
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
      {/* Personal Information */}
      <div className="col-span-1 lg:col-span-6">
        <CustomControlledInput
          name="basicInfo.firstName"
          label={t("firstName")}
        />
      </div>

      <div className="col-span-1 lg:col-span-6">
        <CustomControlledInput
          name="basicInfo.lastName"
          label={t("lastName")}
        />
      </div>

      {/* Birth Information */}
      <div className="col-span-1 lg:col-span-6">
        <CustomControlledCalendar
          name="basicInfo.birthDate"
          label={t("birthday")}
          className=""
          placeholder={t("dateOfBirthPlaceholder")}
          calendarSystem={calendarType}
        />
      </div>

      <div className="col-span-1 lg:col-span-6">
        <CustomControlledInput
          name="basicInfo.jobTitle"
          label={t("jobTitle")}
        />
      </div>

      {/* Personal Status */}
      <div className="col-span-1 lg:col-span-4">
        <CustomControlledSelect
          options={sexOptions}
          name="basicInfo.sex"
          label={t("sex")}
        />
      </div>

      <div className="col-span-1 lg:col-span-4">
        <CustomControlledSelect
          options={maritalOptions}
          name="basicInfo.maritalStatus"
          label={t("maritalStatus")}
        />
      </div>

      <div className="col-span-1 lg:col-span-4">
        <CustomControlledSelect
          options={militaryOptions}
          name="basicInfo.militaryServiceStatus"
          label={t("militaryServiceStatus")}
        />
      </div>
    </div>
  );
};

export const BasicInformation = memo(BasicInformationComponent);
BasicInformation.displayName = "BasicInformation";
