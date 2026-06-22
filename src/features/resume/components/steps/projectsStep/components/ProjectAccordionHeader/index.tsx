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

const ProjectAccordionHeader = ({ index }: HeaderProps) => {
  const projectTitle = useWatch({
    name: `projects.${index}.projectTitle`,
    exact: true,
  });

  const clientName = useWatch({
    name: `projects.${index}.clientName`,
    exact: true,
  });

  const [displayedLabel, setDisplayedLabel] = useState("...");

  useEffect(() => {
    const targetLabel =
      projectTitle || clientName
        ? `${projectTitle ?? ""}  ${clientName ?? ""}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectTitle, clientName]);

  return (
    <div className="flex items-center gap-2">
      <CustomLabel size="lg">{displayedLabel}</CustomLabel>
    </div>
  );
};

export { ProjectAccordionHeader };
