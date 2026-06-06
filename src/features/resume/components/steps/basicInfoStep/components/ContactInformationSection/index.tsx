import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { ContactDetails } from "../ContactDetails";
import { LocationDetails } from "../LocationDetails";
import { TFunction } from "i18next";

type ContactInformationProps = {
  t: TFunction<string, undefined>;
};

const ContactInformation = ({ t }: ContactInformationProps) => {
  return (
    <CustomResumeCardComponents>
      <ContactDetails t={t} />
      <LocationDetails t={t} />
    </CustomResumeCardComponents>
  );
};

export { ContactInformation };
