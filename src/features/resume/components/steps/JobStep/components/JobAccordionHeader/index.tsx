import { CustomLabel } from "@/components/ui/CustomLabel";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

type HeaderProps = {
  index: number;
  t?: TFunction<string, undefined>;
};

const JobAccordionHeader = ({ index, t }: HeaderProps) => {
  const jobTitle = useWatch({
    name: `job.${index}.jobTitle`,
    exact: true,
  });
  const companyName = useWatch({
    name: `job.${index}.companyName`,
    exact: true,
  });

  const [displayedLabel, setDisplayedLabel] = useState("...");

  useEffect(() => {
    const targetLabel =
      jobTitle || companyName
        ? `${jobTitle ?? ""} ${companyName ?? ""}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
    }, 500);

    return () => clearTimeout(timer);
  }, [jobTitle, companyName, t]);

  return (
    <div className="flex items-center gap-2">
      <CustomLabel size="lg">{displayedLabel}</CustomLabel>
    </div>
  );
};

export { JobAccordionHeader };
