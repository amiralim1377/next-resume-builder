import { ComponentType } from "react";
import {
  BasicInfoValues,
  EducationValues,
  JobValues,
} from "../schemas/resume.schema";

export interface Resume {
  id?: string;
  basicInfo: BasicInfoValues;
  education: EducationValues[];
  job: JobValues[];
  experience: [];
  skills: [];
  projects: [];
  research: [];
  metadata: { language: "fa" | "en"; lastSaved: Date };
}

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
  fieldNames: (keyof Resume)[];
  isOptional: boolean;
  icon?: string;
}
