import { ComponentType } from "react";
import { ResumeFormValues } from "../schemas/resume.schema";

export type StepName =
  | "basic"
  | "education"
  | "job"
  | "experience"
  | "qualifications"
  | "projects"
  | "research";

export type SectionState = "empty" | "draft" | "completed" | "invalid";

export type StepStatus = "empty" | "completed" | "invalid" | "draft";
export type RowStatus = "empty" | "draft" | "invalid" | "completed";

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
