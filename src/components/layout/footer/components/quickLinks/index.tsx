"use client";
import { CustomLabel } from "@/components/ui/customLabel";
import { CustomLink } from "@/components/ui/customLink";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { ReactNode } from "react";

type quickLinksDataArrayType = {
  labe: string;
  icon: ReactNode;
  href: string;
};

function QuickLinks() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "footer");

  const quickLinksDataArray: quickLinksDataArrayType[] = [
    {
      labe: t("home"),
      icon: "ss",
      href: "#",
    },
    {
      labe: t("dashbord"),
      icon: "ss",
      href: "#",
    },
    {
      labe: t("editProfile"),
      icon: "ss",
      href: "#",
    },
  ];
  return (
    <div>
      <div className="w-fit">
        <CustomLabel
          classNames={{
            labelClassName: "text-white font-semibold",
            wrapperClassName: "flex flex-col ",
          }}
        >
          {t("quickLinks")}
        </CustomLabel>
      </div>
      <div className="text-text-secondary mt-8 flex flex-col">
        {quickLinksDataArray.map((item, i) => {
          return (
            <CustomLink
              className="hover:text-brandLight capitalize"
              key={i}
              href={item.href}
            >
              {item.labe}
            </CustomLink>
          );
        })}
      </div>
    </div>
  );
}

export { QuickLinks };
