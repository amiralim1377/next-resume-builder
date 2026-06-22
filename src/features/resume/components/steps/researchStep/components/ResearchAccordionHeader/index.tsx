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

const ResearchAccordionHeader = ({ index }: HeaderProps) => {
  const researchTitle = useWatch({
    name: `research.${index}.researchTitle`,
    exact: true,
  });

  const publisher = useWatch({
    name: `research.${index}.publisher`,
    exact: true,
  });

  const [displayedLabel, setDisplayedLabel] = useState("...");

  useEffect(() => {
    const targetLabel =
      researchTitle || publisher
        ? `${researchTitle ?? ""}  ${publisher ?? ""}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
    }, 500);

    return () => clearTimeout(timer);
  }, [researchTitle, publisher]);

  return (
    <div className="flex items-center gap-2">
      <CustomLabel size="lg">{displayedLabel}</CustomLabel>
    </div>
  );
};

export { ResearchAccordionHeader };
