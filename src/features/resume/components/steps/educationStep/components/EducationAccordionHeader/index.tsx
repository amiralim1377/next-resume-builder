import { CustomLabel } from "@/components/ui/CustomLabel";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

type HeaderProps = {
  index: number;
  t: TFunction<string, undefined>;
};

const EducationAccordionHeader = ({ index, t }: HeaderProps) => {
  const degreeLevel = useWatch({
    name: `education.${index}.degreeLevel`,
    exact: true,
  });
  const academicMajor = useWatch({
    name: `education.${index}.academicMajor`,
    exact: true,
  });

  const [displayedLabel, setDisplayedLabel] = useState("...");

  useEffect(() => {
    const targetLabel =
      degreeLevel || academicMajor
        ? `${t(`degree.${degreeLevel ?? ""}`)} ${academicMajor ?? ""}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
    }, 500);

    return () => clearTimeout(timer);
  }, [degreeLevel, academicMajor, t]);

  return (
    <div className="flex items-center gap-2">
      <CustomLabel size="lg">{displayedLabel}</CustomLabel>
    </div>
  );
};

export { EducationAccordionHeader };
