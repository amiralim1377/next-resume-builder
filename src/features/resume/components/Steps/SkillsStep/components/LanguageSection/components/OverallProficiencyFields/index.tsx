// import { CustomControlledSelect } from "@/components/ui/CustomControlledSelect";
// import { Language } from "@/lib/i18n/settings";
// import { TFunction } from "i18next";
// import { useGetSkillsInfoStepData } from "../../../../hooks/useGetSkillsInfoStepData";

// type OverallProficiencyFieldsProps = {
//   index: number;
//   profType: string;
//   t: TFunction<string, undefined>;
//   lng: Language;
// };

// const OverallProficiencyFields = ({
//   index,
//   profType,
//   lng,
//   t,
// }: OverallProficiencyFieldsProps) => {
//   const {
//     descripitveLevelOptions,
//     cefrLevelsLevelOptions,
//     graphicLevelsOptions,
//   } = useGetSkillsInfoStepData({
//     lng,
//   });
//   return (
//     <div>
//       {profType === "descriptive" && (
//         <CustomControlledSelect
//           name={`languages.${index}.proficiencyData.level` as const}
//           label={t("level")}
//           options={descripitveLevelOptions}
//         />
//       )}

//       {profType === "cefr" && (
//         <CustomControlledSelect
//           name={`languages.${index}.proficiencyData.level` as const}
//           label={t("level")}
//           options={cefrLevelsLevelOptions}
//         />
//       )}

//       {profType === "graphic" && (
//         <CustomControlledSelect
//           name={`languages.${index}.proficiencyData.level` as const}
//           label={t("level")}
//           options={graphicLevelsOptions}
//         />
//       )}
//     </div>
//   );
// };

// export { OverallProficiencyFields };
