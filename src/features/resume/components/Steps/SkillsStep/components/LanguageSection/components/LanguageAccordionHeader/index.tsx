// import { CustomLabel } from "@/components/ui/CustomLabel";
// import { LANGUAGES_DATA } from "@/core/data/languagesData";
// import { Language } from "@/lib/i18n/settings";
// import { TFunction } from "i18next";
// import { useEffect, useState } from "react";
// import { useWatch } from "react-hook-form";

// type HeaderProps = {
//   index: number;
//   t?: TFunction<string, undefined>;
//   lng: Language;
// };

// const LanguageAccordionHeader = ({ index, lng }: HeaderProps) => {
//   const language = useWatch({
//     name: `languages.${index}.language`,
//     exact: true,
//   });

//   const [displayedLabel, setDisplayedLabel] = useState("...");

//   const relatedLng =
//     lng === "fa"
//       ? LANGUAGES_DATA?.fa.find((item) => item.value === language)
//       : LANGUAGES_DATA?.en.find((item) => item.value === language);

//   useEffect(() => {
//     const targetLabel = relatedLng ? `${relatedLng.name ?? ""} `.trim() : "...";

//     const timer = setTimeout(() => {
//       setDisplayedLabel(targetLabel);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [relatedLng]);

//   return (
//     <div className="flex items-center gap-2">
//       <CustomLabel size="lg">{displayedLabel}</CustomLabel>
//     </div>
//   );
// };

// export { LanguageAccordionHeader };
