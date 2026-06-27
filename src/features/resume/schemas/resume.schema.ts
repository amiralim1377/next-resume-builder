import { TFunction } from "i18next";
import * as z from "zod/v4";
import { createBasicInfoSchema } from "./BasicInfoSchema";
import { createEducationSchema } from "./EducationSchema";
import { createJobSchema } from "./JobSchema";
import { createLanguageSchema } from "./LanguageSchema";
import { createSkillsSchema } from "./SkillsSchema";
import { createCoursesAndCertificationsSchema } from "./CoursesAndCertificationsSchema";
import { createProjectsSchema } from "./ProjectsSchema";
import { createResearchSchema } from "./ResearchSchema";
import { createProfileImageSchema } from "./ProfileImageSchema";

export const createResumeSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    profileImage: createProfileImageSchema(t),
    basicInfo: createBasicInfoSchema(t),
    education: z.array(createEducationSchema(t)),
    job: z.array(createJobSchema(t)),
    languages: z.array(createLanguageSchema(t)),
    skills: z.array(createSkillsSchema(t)),
    coursesAndCertifications: z.array(createCoursesAndCertificationsSchema(t)),

    projects: z.array(createProjectsSchema(t)),

    research: z.array(createResearchSchema(t)),
  });
};

export type ResumeFormValues = z.infer<ReturnType<typeof createResumeSchema>>;
export type EducationFormValue = ResumeFormValues["education"][number];
export type JobFormValue = ResumeFormValues["job"][number];
export type LanguageFormValue = ResumeFormValues["languages"][number];
export type SkillsFormValue = ResumeFormValues["skills"][number];
export type CoursesAndCertificationsFormValue =
  ResumeFormValues["coursesAndCertifications"][number];
export type ProjectsFormValue = ResumeFormValues["projects"][number];
export type ResearchFormValue = ResumeFormValues["research"][number];
