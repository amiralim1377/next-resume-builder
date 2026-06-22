import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { ContactDetails } from "../ContactDetails";
import { LocationDetails } from "../LocationDetails";
import { TFunction } from "i18next";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { Contact } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";

type ContactInformationProps = {
  t: TFunction<string, undefined>;
};

const ContactInformation = ({ t }: ContactInformationProps) => {
  const { colors } = useThemeColors();

  return (
    <CustomResumeCardComponents
      label={
        <CustomLabel
          size="lg"
          variant="bold"
          icon={<Contact color={colors.brand?.brandPrimary} />}
        >
          {t("contactInformation")}
        </CustomLabel>
      }
    >
      <ContactDetails t={t} />
      <LocationDetails t={t} />
    </CustomResumeCardComponents>
  );
};

export { ContactInformation };
