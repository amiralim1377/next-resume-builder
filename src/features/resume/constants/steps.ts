import { BasicInfoStep } from "../components/Steps/BasicInfoStep";
import { EducationStep } from "../components/Steps/EducationStep";
import { ProjectsStep } from "../components/Steps/ProjectsStep";
import { ResearchStep } from "../components/Steps/ResearchStep";
import { SkillsStep } from "../components/Steps/SkillsStep";
import { StepConfig } from "../types/resume.types";

export const RESUME_STEPS: StepConfig[] = [
  {
    id: "basic",
    title: "اطلاعات پایه",
    titleKey: "stepsBasic",
    titleEn: "Basic Information",
    component: BasicInfoStep,
    fieldNames: ["basicInformation"] as const,
    isOptional: false,
    icon: "👤",
  },
  {
    id: "education",
    title: "تحصیلات",
    titleKey: "stepsEducation",
    titleEn: "Education History",
    component: EducationStep,
    fieldNames: ["educationHistory"] as const,
    isOptional: false,
    icon: "🎓",
  },
  {
    id: "job",
    title: "سوابق شغلی",
    titleKey: "stepsEmploymentHistory",
    titleEn: "Employment History",
    component: EducationStep,
    fieldNames: ["employmentHistory"] as const,
    isOptional: false,
    icon: "👷🏻‍♂️",
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
