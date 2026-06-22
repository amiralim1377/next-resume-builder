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

const CoursesCertificationsAccordionHeader = ({ index }: HeaderProps) => {
  const coursesAndCertificationsName = useWatch({
    name: `coursesAndCertifications.${index}.coursesAndCertificationsName`,
    exact: true,
  });

  const instituteName = useWatch({
    name: `coursesAndCertifications.${index}.instituteName`,
    exact: true,
  });

  const [displayedLabel, setDisplayedLabel] = useState("...");

  useEffect(() => {
    const targetLabel =
      coursesAndCertificationsName || instituteName
        ? `${coursesAndCertificationsName ?? ""}  ${instituteName ?? ""}`.trim()
        : "...";

    const timer = setTimeout(() => {
      setDisplayedLabel(targetLabel);
    }, 500);

    return () => clearTimeout(timer);
  }, [instituteName, coursesAndCertificationsName]);

  return (
    <div className="flex items-center gap-2">
      <CustomLabel size="lg">{displayedLabel}</CustomLabel>
    </div>
  );
};

export { CoursesCertificationsAccordionHeader };
