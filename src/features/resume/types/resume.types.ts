import { ComponentType } from "react";
import { ResumeFormValues } from "../schemas/resume.schema";
// import {
//   BasicInfoValues,
//   EducationValues,
//   JobValues,
//   ProjectsValues,
//   ResearchValues,
//   SkillsValues,
// } from "../schemas/resume.schema";

// export interface Resume {
//   id?: string;
//   profileImage?: {
//     file?: File;
//   };
//   basicInfo: BasicInfoValues;
//   education: EducationValues[];
//   job: JobValues[];
//   skills: SkillsValues[];
//   projects: ProjectsValues[];
//   research: ResearchValues[];
//   metadata: { language: "fa" | "en"; lastSaved: Date };
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
  fieldNames: (keyof ResumeFormValues)[];
  isOptional: boolean;
  icon?: string;
}
