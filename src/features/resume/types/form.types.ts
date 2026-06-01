import { ComponentType } from "react";

export interface BasicInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location?: string;
  summary?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatar?: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
  current?: boolean;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  current?: boolean;
}

export interface Skill {
  id?: string;
  name: string;
  level?: number;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Research {
  id?: string;
  title: string;
  institution?: string;
  date: string;
  description: string;
  link?: string;
}

// ==================== MAIN RESUME TYPE ====================

export interface Resume {
  id?: string;
  basicInfo: BasicInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  research: Research[];
  metadata: {
    language: "fa" | "en";
    lastSaved: Date;
    isCompleted?: boolean;
  };
}

// ==================== STEPPER TYPES ====================

export type StepName =
  | "basic"
  | "education"
  | "experience"
  | "skills"
  | "projects"
  | "research";

export interface StepConfig {
  id: StepName;
  titleKey: string;
  titleEn: string;
  component: ComponentType;
  fieldNames: readonly string[];
  isOptional: boolean;
  icon?: string;
}
