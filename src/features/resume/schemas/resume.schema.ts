import { TFunction } from "i18next";
import * as z from "zod/v4";
import { createBasicInfoSchema } from "./BasicInfoSchema";
import { createEducationSchema } from "./EducationSchema";
import { createJobSchema } from "./JobSchema";
import { createLanguageSchema } from "./LanguageSchema";
// import { createSkillsSchema } from "./SkillsSchema";
import { createCoursesAndCertificationsSchema } from "./CoursesAndCertificationsSchema";
import { createResearchSchema } from "./ResearchSchema";
import { createProfileImageSchema } from "./ProfileImageSchema";
import { createProjectSchema } from "./ProjectsSchema";

export const createResumeSchema = (t: TFunction<string, undefined>) => {
  return z.object({
    profileImage: createProfileImageSchema(t),
    basicInfo: createBasicInfoSchema(t),
    education: z.array(createEducationSchema(t)),
    job: z.array(createJobSchema(t)),
    languages: z.array(createLanguageSchema(t)),
    // skills: z.array(createSkillsSchema(t)),
    coursesAndCertifications: z.array(createCoursesAndCertificationsSchema(t)),

    projects: z.array(createProjectSchema(t)),

    research: z.array(createResearchSchema(t)),
  });
};

export type ResumeFormValues = z.infer<ReturnType<typeof createResumeSchema>>;
