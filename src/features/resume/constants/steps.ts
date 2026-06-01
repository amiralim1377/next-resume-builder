import { BasicInfoStep } from "../components/steps/basicInfoStep";
import { EducationStep } from "../components/steps/educationStep";
import { ProjectsStep } from "../components/steps/projectsStep";
import { ResearchStep } from "../components/steps/researchStep";
import { SkillsStep } from "../components/steps/skillsStep";
import { StepConfig } from "../types/resume.types";

export const RESUME_STEPS: StepConfig[] = [
  {
    id: "basic",
    title: "اطلاعات پایه",
    titleEn: "Basic Information",
    component: BasicInfoStep,
    fieldNames: ["basicInfo"] as const,
    isOptional: false,
    icon: "👤",
  },
  {
    id: "education",
    title: "تحصیلات",
    titleEn: "Education History",
    component: EducationStep,
    fieldNames: ["education"] as const,
    isOptional: false,
    icon: "🎓",
  },
  {
    id: "skills",
    title: "مهارت‌ها",
    titleEn: "Skills",
    component: SkillsStep,
    fieldNames: ["skills"] as const,
    isOptional: true,
    icon: "⚡",
  },
  {
    id: "projects",
    title: "پروژه‌ها",
    titleEn: "Projects",
    component: ProjectsStep,
    fieldNames: ["projects"] as const,
    isOptional: true,
    icon: "🚀",
  },
  {
    id: "research",
    title: "تحقیقات و مقالات",
    titleEn: "Research & Publications",
    component: ResearchStep,
    fieldNames: ["research"] as const,
    isOptional: true,
    icon: "📚",
  },
];

export const getStepById = (id: string) =>
  RESUME_STEPS.find((step) => step.id === id);

export const getStepIndex = (id: string) =>
  RESUME_STEPS.findIndex((step) => step.id === id);
