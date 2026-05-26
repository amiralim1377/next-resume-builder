"use client";

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, Language, languages } from "./settings";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    preload: languages,
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  });

export function useTranslation(lng: Language, ns: string, options = {}) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  // Optimization: If we are on server and language doesn't match, sync it
  if (typeof window === "undefined" && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  return ret;
}
