export type Language = "en" | "fa";
export const fallbackLng = "fa";
export const languages = [fallbackLng, "en"];
export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
