import { CustomControlledInput } from "@/components/ui/CustomControlledInput";
import { TFunction } from "i18next";

type ContactDetailsProps = {
  t: TFunction<string, undefined>;
};

const ContactDetails = ({ t }: ContactDetailsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <CustomControlledInput name="basicInfo.email" label={t("email")} />

      <CustomControlledInput
        name="basicInfo.mobileNumber"
        label={t("mobileNumber")}
      />

      <CustomControlledInput name="basicInfo.phone" label={t("phone")} />

      <CustomControlledInput
        placeholder={t("optional")}
        name="basicInfo.webSite"
        label={t("webSite")}
      />
    </div>
  );
};

export { ContactDetails };
