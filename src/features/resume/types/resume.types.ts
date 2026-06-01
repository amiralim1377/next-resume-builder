import { ComponentType } from "react";
import { BasicInfo } from "./form.types";

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
  titleKey: string;
  titleEn: string;
  component: ComponentType;
  fieldNames: readonly string[];
  isOptional: boolean;
  icon?: string;
}
