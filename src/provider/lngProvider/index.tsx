"use client";
import { Language } from "@/lib/i18n/settings";
import { ReactNode, createContext, useContext } from "react";

interface LangContextProps {
  lng: Language;
}

type LangProviderProps = {
  children: ReactNode;
  lng: Language;
};

const initialValue: LangContextProps = {
  lng: "en",
};

const LangContext = createContext(initialValue);

export const LangProvider = ({ children, lng }: LangProviderProps) => {
  return (
    <LangContext.Provider value={{ lng }}>{children}</LangContext.Provider>
  );
};

export const useLang = () => {
  const { lng } = useContext(LangContext);
  return { lng };
};
