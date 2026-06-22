import { CustomLabel } from "@/components/ui/CustomLabel";
import { Language } from "@/lib/i18n/settings";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

type HeaderProps = {
  index: number;
  t?: TFunction<string, undefined>;
  lng?: Language;
};

const CoreSkillAccordionHeader = ({ index }: HeaderProps) => {
  const skillName = useWatch({
    name: `skills.${index}.skillName`,
    exact: true,
  });

  const [displayedLabel, setDisplayedLabel] = useState("...");

  useEffect(() => {
    const targetLabel = skillName ? `${skillName ?? ""} `.trim() : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
    }, 500);

    return () => clearTimeout(timer);
  }, [skillName]);

  return (
    <div className="flex items-center gap-2">
      <CustomLabel size="lg">{displayedLabel}</CustomLabel>
    </div>
  );
};

export { CoreSkillAccordionHeader };
