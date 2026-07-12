import { CustomResumeCardComponents } from "@/components/ui/CustomResumeCardComponents";
import { CustomLabel } from "@/components/ui/CustomLabel";
import { Contact } from "lucide-react";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { ContactDetails } from "../ContactDetails";
import { LocationDetails } from "../LocationDetails";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";

const ContactInformation = () => {
  const { colors } = useThemeColors();
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");

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
