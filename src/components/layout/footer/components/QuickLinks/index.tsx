"use client";
import { CustomProgressLabel } from "@/components/ui/CustomProgressLabel";
import { CustomLink } from "@/components/ui/CustomLink";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { ReactNode } from "react";

type quickLinksDataArrayType = {
  label: string;
  icon: ReactNode;
  href: string;
};

function QuickLinks() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "footer");

  const quickLinksDataArray: quickLinksDataArrayType[] = [
    {
      label: t("home"),
      icon: "ss",
      href: "#",
    },
    {
      label: t("dashbord"),
      icon: "ss",
      href: "#",
    },
    {
      label: t("editProfile"),
      icon: "ss",
      href: "#",
    },
  ];
  return (
    <div className="flex flex-col items-start md:items-start">
      <div className="w-fit">
        <CustomProgressLabel
          classNames={{
            labelClassName: "text-white font-semibold",
            wrapperClassName: "flex flex-col ",
          }}
        >
          {t("quickLinks")}
        </CustomProgressLabel>
      </div>
      <div className="text-text-secondary mt-4 flex flex-col items-start lg:mt-8">
        {quickLinksDataArray.map((item, i) => {
          return (
            <CustomLink
              className="hover:text-brandLight capitalize"
              key={i}
              href={item.href}
            >
              {item.label}
            </CustomLink>
          );
        })}
      </div>
    </div>
  );
}

export { QuickLinks };
