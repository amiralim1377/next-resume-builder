"use client";
import { useTranslation } from "@/lib/i18n/client";
import { useLang } from "@/provider/lngProvider";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { DesktopHeaderNavigation } from "./components/desktopHeaderNavigation";
import { LogoWithText } from "./components/logoWithText";

function Header() {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "common");
  const { colors } = useThemeColors();
  const { switchTheme, theme } = useThemeColors();

  return (
    <div className="bg-ui-bg border-ui-border flex w-full items-center justify-between border-b px-8 py-6">
      <div className="flex items-center gap-1">
        <LogoWithText theme={theme} colors={colors} t={t} />
      </div>
      <DesktopHeaderNavigation
        t={t}
        colors={colors}
        lng={lng}
        theme={theme}
        onSwitchTheme={switchTheme}
      />
    </div>
  );
}

export { Header };
