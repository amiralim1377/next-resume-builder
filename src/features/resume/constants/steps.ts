import { BasicInfoStep } from "../components/Steps/basicInfoStep";
import { EducationStep } from "../components/Steps/educationStep";
import { ProjectsStep } from "../components/Steps/projectsStep";
import { ResearchStep } from "../components/Steps/researchStep";
import { SkillsStep } from "../components/Steps/skillsStep";
import { StepConfig } from "../types/resume.types";

export const RESUME_STEPS: StepConfig[] = [
  {
    id: "basic",
    title: "اطلاعات پایه",
    titleKey: "stepsBasic",
    titleEn: "Basic Information",
    component: BasicInfoStep,
    fieldNames: ["basicInfo"] as const,
    isOptional: false,
    icon: "👤",
  },
  {
    id: "education",
    title: "تحصیلات",
    titleKey: "stepsEducation",
    titleEn: "Education History",
    component: EducationStep,
    fieldNames: ["education"] as const,
    isOptional: false,
    icon: "🎓",
  },
  {
    id: "skills",
    title: "مهارت‌ها",
    titleKey: "stepsSkills",
    titleEn: "Skills",
    component: SkillsStep,
    fieldNames: ["skills"] as const,
    isOptional: true,
    icon: "⚡",
  },
  {
    id: "projects",
    title: "پروژه‌ها",
    titleKey: "stepsProjects",
    titleEn: "Projects",
    component: ProjectsStep,
    fieldNames: ["projects"] as const,
    isOptional: true,
    icon: "🚀",
  },
  {
    id: "research",
    title: "تحقیقات و مقالات",
    titleKey: "stepsResearch",
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
