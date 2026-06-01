import { ComponentType } from "react";

export interface Resume {
  id?: string;
  basicInfo: BasicInfo;
  metadata: { language: "fa" | "en"; lastSaved: Date };
}

export type StepName =
  | "basic"
  | "education"
  | "experience"
  | "skills"
  | "projects"
  | "research";

export interface StepConfig {
  id: StepName;
  title: string;
  titleEn: string;
  component: ComponentType;
  fieldNames: readonly string[];
  isOptional: boolean;
  icon?: string;
}
