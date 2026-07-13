import { SectionState } from "@/features/resume/types/resume.types";
import { CoursesCertificationsStatusEngine } from "./coursesCertifications.engine";
import { CoursesAndCertificationsRowValues } from "../schemas/CoursesAndCertificationsSchema";

const skillsStepStatusEngine = {
  getStepStatus: (
    rowsData: [unknown, unknown, unknown],
    hasErrorsArray: [boolean, boolean, boolean],
  ): SectionState => {
    const [coursesData] = rowsData;
    const [coursesErr] = hasErrorsArray;

    const coursesStatus = CoursesCertificationsStatusEngine.getStepStatus(
      coursesData as CoursesAndCertificationsRowValues[],
      coursesErr,
    );

    const statuses = [coursesStatus];

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
