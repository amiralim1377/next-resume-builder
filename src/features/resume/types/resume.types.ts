import { ComponentType } from "react";

// ==================== MAIN RESUME TYPE ====================
// export interface Resume {
//   id?: string;
//   basicInfo: BasicInfo;
//   education: Education[];
//   experience: Experience[];
//   skills: Skill[];
//   projects: Project[];
//   research: Research[];
//   metadata: {
//     language: "fa" | "en";
//     lastSaved: Date;
//     isCompleted?: boolean;
//   };
// }

// ==================== STEPPER TYPES ====================

export type StepName =
  | "basic"
  | "education"
  | "job"
  | "experience"
  | "skills"
  | "projects"
  | "research";

export interface StepConfig {
  id: StepName;
  title: string;
  titleKey: string;
  titleEn: string;
  component: ComponentType;
  fieldNames: string[];
  isOptional: boolean;
  icon?: string;
}
