import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useGetBasicInfoStepData } from "../../hooks/useGetBasicInfoStepData";
import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";

type BasicInformationProps = {
  t: TFunction<string, undefined>;
  lng: Language;
};

const BasicInformation = ({ t, lng }: BasicInformationProps) => {
  const {
    daysInMonthOptions,
    maritalOptions,
    militaryOptions,
    sexOptions,
    monthOptions,
    yearOptions,
  } = useGetBasicInfoStepData({ t, lng });

  return (
    <div className="grid w-3/4 grid-cols-12 gap-4">
      <div className="col-span-6">
        <CustomControlledInput
          name="basicInfo.firstName"
          label={t("firstName")}
        />
      </div>

      <div className="col-span-6">
        <CustomControlledInput
          name="basicInfo.lastName"
          label={t("lastName")}
        />
      </div>

      <div className="col-span-6">
        <CustomControlledInput
          name="basicInfo.jobTitle"
          label={t("jobTitle")}
        />
      </div>

      <div className="col-span-6">
        <CustomControlledSelect
          options={sexOptions}
          name="basicInfo.sex"
          label={t("sex")}
        />
      </div>

      <div className="col-span-6">
        <CustomControlledSelect
          options={maritalOptions}
          name="basicInfo.maritalStatus"
          label={t("maritalStatus")}
        />
      </div>

      <div className="col-span-6">
        <CustomControlledSelect
          options={militaryOptions}
          name="basicInfo.militaryServiceStatus"
          label={t("militaryServiceStatus")}
        />
      </div>

      <div className="col-span-4">
        <CustomControlledSelect
          options={daysInMonthOptions}
          name="basicInfo.birthday.day"
          label={t("day")}
        />
      </div>

      <div className="col-span-4">
        <CustomControlledSelect
          options={monthOptions}
          name="basicInfo.birthday.month"
          label={t("month")}
        />
      </div>

      <div className="col-span-4">
        <CustomControlledSelect
          options={yearOptions}
          name="basicInfo.birthday.year"
          label={t("year")}
        />
      </div>
    </div>
  );
};

export { BasicInformation };
