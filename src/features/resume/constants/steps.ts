import { BasicInfoStep } from "../components/Steps/BasicInfoStep";
import { EducationStep } from "../components/Steps/EducationStep";
import { JobStep } from "../components/Steps/JobStep";
import { ProjectsStep } from "../components/Steps/ProjectsStep";
import { ResearchStep } from "../components/Steps/ResearchStep";
import { SkillsStep } from "../components/Steps/SkillsStep";
import { StepConfig } from "../types/resume.types";

export const RESUME_STEPS: StepConfig[] = [
  {
    id: "basic",
    title: "اطلاعات پایه",
    titleKey: "basicInformation",
    titleEn: "Basic Information",
    component: BasicInfoStep,
    fieldNames: ["basicInfo", "profileImage"],
    isOptional: false,
    icon: "👤",
  },
  {
    id: "education",
    title: "تحصیلات",
    titleKey: "educationHistory",
    titleEn: "Education History",
    component: EducationStep,
    fieldNames: ["education"],
    isOptional: false,
    icon: "🎓",
  },
  {
    id: "job",
    title: "سوابق شغلی",
    titleKey: "employmentHistory",
    titleEn: "Employment History",
    component: JobStep,
    fieldNames: ["job"],
    isOptional: false,
    icon: "👷🏻‍♂️",
  },
  {
    id: "skills",
    title: "مهارت‌ها",
    titleKey: "skills",
    titleEn: "Skills",
    component: SkillsStep,
    fieldNames: ["skills", "languages", "coursesAndCertifications"],
    isOptional: true,
    icon: "⚡",
  },
  {
    id: "projects",
    title: "پروژه‌ها",
    titleKey: "projects",
    titleEn: "Projects",
    component: ProjectsStep,
    fieldNames: ["projects"],
    isOptional: true,
    icon: "🚀",
  },
  {
    id: "research",
    title: "تحقیقات و مقالات",
    titleKey: "research",
    titleEn: "Research & Publications",
    component: ResearchStep,
    fieldNames: ["research"],
    isOptional: true,
    icon: "📚",
  },
];

export const getStepById = (id: string) =>
  RESUME_STEPS.find((step) => step.id === id);

export const getStepIndex = (id: string) =>
  RESUME_STEPS.findIndex((step) => step.id === id);
