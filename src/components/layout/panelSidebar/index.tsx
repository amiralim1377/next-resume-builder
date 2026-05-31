"use client";
import { CustomAvatar } from "@/components/ui/customAvatar";
import { CustomButton } from "@/components/ui/customButton";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { cn } from "@/utils/cn";

const PanelSidebar = () => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "common");
  return (
    <aside
      className={cn(
        "border-ui-border flex w-full flex-col justify-center gap-3 px-8 py-6",
        lng === "fa" ? "border-l" : "border-r",
      )}
    >
      <CustomAvatar name="AMIRALI" />
      <CustomButton>{t("buildNewResume")}</CustomButton>
      <CustomButton variant="primary">{t("dashboard")}</CustomButton>
      <CustomButton>{t("myResumes")}</CustomButton>
      <CustomButton>{t("helpGuide")}</CustomButton>
      <CustomButton>{t("settings")}</CustomButton>
      <CustomButton variant="outlined-negative">{t("exit")}</CustomButton>
    </aside>
  );
};

export { PanelSidebar };
