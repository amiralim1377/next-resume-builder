import { ReactNode } from "react";
import { SizeProvider } from "./widthProvider";
import { LangProvider } from "./lngProvider";
import { Language } from "@/lib/i18n/settings";

type MainProviderProps = {
  children: ReactNode;
  lng: Language;
};

const MainProvider = ({ children, lng }: MainProviderProps) => {
  return (
    <LangProvider lng={lng}>
      <SizeProvider>{children}</SizeProvider>
    </LangProvider>
  );
};
export { MainProvider };
