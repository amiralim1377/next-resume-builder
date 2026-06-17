import { TFunction } from "i18next";
import { z } from "zod";
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
    languages: z.array(createLanguageSchema(t)).default([]),
    skills: z.array(createSkillsSchema(t)).default([]),
    coursesAndCertifications: z
      .array(createCoursesAndCertificationsSchema(t))
      .default([]),
    projects: z.array(createProjectsSchema(t)).default([]),
    research: z.array(createResearchSchema(t)).default([]),
  });
};

export type ResumeFormValues = z.infer<ReturnType<typeof createResumeSchema>>;

// export type ResumeFormValues = {
//   profileImage: ProfileImageValues;
//   basicInfo: BasicInfoValues;
//   education: EducationValues[];
//   job: JobValues[];
//   languages: LanguageValues[];
//   skills: SkillsValues[];
//   coursesAndCertifications: CoursesAndCertificationsValues[];
//   projects: ProjectsValues[];
//   research: ResearchValues[];
// };
// export type BasicInfoValues = z.infer<ReturnType<typeof createBasicInfoSchema>>;
// export type EducationValues = z.infer<ReturnType<typeof createEducationSchema>>;
// export type JobValues = z.infer<ReturnType<typeof createJobSchema>>;
// export type LanguageValues = z.infer<ReturnType<typeof createLanguageSchema>>;
// export type SkillsValues = z.infer<ReturnType<typeof createSkillsSchema>>;
// export type CoursesAndCertificationsValues = z.infer<
//   ReturnType<typeof createCoursesAndCertificationsSchema>
// >;
// export type ProjectsValues = z.infer<ReturnType<typeof createProjectsSchema>>;
// export type ResearchValues = z.infer<ReturnType<typeof createResearchSchema>>;
// export type ProfileImageValues = z.infer<
//   ReturnType<typeof createProfileImageSchema>
// >;
//

export const STEP_FIELDS: Record<number, string[]> = {
  0: [],
  1: [
    "basicInfo.firstName",
    "basicInfo.lastName",
    "basicInfo.jobTitle",
    "basicInfo.email",
    "basicInfo.phone",
    "basicInfo.sex",
    "basicInfo.summary",
    "basicInfo.birthday",
    "basicInfo.militaryServiceStatus",
    "basicInfo.maritalStatus",
    "basicInfo.webSite",
  ],
  2: [],
  3: [],
  4: ["skills.skillName", "skills.skillLevel"],
  5: [
    "CoursesAndCertifications.coursesAndCertificationsName",
    "CoursesAndCertifications.instituteName",
    "CoursesAndCertifications.certificateIssueMonth",
    "CoursesAndCertifications.certificateIssueYear",
    "CoursesAndCertifications.certificateUrl",
  ],
  6: [
    "projects.projectTitle",
    "projects.clientName",
    "projects.projectUrl",
    "projects.projectMonth",
    "projects.projectYear",
    "projects.description",
  ],
  7: [
    "research.researchTitle",
    "research.publisher",
    "research.researchUrl",
    "research.publicationMonth",
    "research.publicationYear",
  ],
};
