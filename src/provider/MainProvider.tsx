import { ReactNode } from "react";
import { SizeProvider } from "./widthProvider";
import { LangProvider } from "./lngProvider";
import { Language } from "@/lib/i18n/settings";
import { PageLoadingProvider } from "./PageLoadingProvider";
import { ThemeProvider, ThemeScheme } from "./themeProvider";

type MainProviderProps = {
  children: ReactNode;
  lng: Language;
  themeFromCookie: ThemeScheme;
};

const MainProvider = ({
  children,
  lng,
  themeFromCookie,
}: MainProviderProps) => {
  return (
    <LangProvider lng={lng}>
      <PageLoadingProvider>
        <ThemeProvider themeFromCookie={themeFromCookie}>
          <SizeProvider>{children}</SizeProvider>
        </ThemeProvider>
      </PageLoadingProvider>
    </LangProvider>
  );
};
export { MainProvider };
