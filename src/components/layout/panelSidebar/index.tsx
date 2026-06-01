"use client";

import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { cn } from "@/utils/cn";
import { PanelSidebarNavigation } from "./components/PanelSidebarNavigation";
import { PanelSidebarUserInfo } from "./components/PanelSidebarUserInfo";

const PanelSidebar = () => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "common");

  return (
    <aside
      className={cn(
        "border-ui-border flex w-full flex-col justify-center gap-3 px-8 py-12",
        lng === "fa" ? "border-l" : "border-r",
      )}
    >
      <PanelSidebarUserInfo t={t} />
      <PanelSidebarNavigation t={t} lng={lng} />
    </aside>
  );
};

export { PanelSidebar };
