import { SectionState } from "@/features/resume/types/resume.types";
import { CoursesCertificationsStatusEngine } from "./coursesCertifications.engine";
import { CoursesAndCertificationsRowValues } from "../schemas/CoursesAndCertificationsSchema";
import { coreSkillStatusEngine } from "./coreSkills.engine";
import { SkillsRowValues } from "../schemas/SkillsSchema";

const skillsStepStatusEngine = {
  getStepStatus: (
    rowsData: [unknown, unknown, unknown],
    hasErrorsArray: [boolean, boolean, boolean],
  ): SectionState => {
    const [coursesData, coreSkillsData] = rowsData;
    const [coursesErr, coreSkillsErr] = hasErrorsArray;

    const coursesStatus = CoursesCertificationsStatusEngine.getStepStatus(
      coursesData as CoursesAndCertificationsRowValues[],
      coursesErr,
    );

    const coreSkillsStatus = coreSkillStatusEngine.getStepStatus(
      coreSkillsData as SkillsRowValues[],
      coreSkillsErr,
    );

    const statuses = [coursesStatus, coreSkillsStatus];

    if (statuses.includes("draft")) {
      return "draft";
    }

    if (statuses.every((s) => s === "empty")) {
      return "empty";
    }

    return "completed";
  },
};

export { skillsStepStatusEngine };
