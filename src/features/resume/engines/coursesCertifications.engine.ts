import {
  CoursesAndCertificationsRowValues,
  getStrictCoursesAndCertificationsSchema,
} from "../schemas/CoursesAndCertificationsSchema";
import { createArrayStepEngine } from "../utils/formStatusEngine";
import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";

export const CoursesCertificationsStatusEngine =
  createArrayStepEngine<CoursesAndCertificationsRowValues>({
    isEmpty: isGenericRowEmpty,
    isComplete: (rowValues) => {
      if (!rowValues) return false;
      return getStrictCoursesAndCertificationsSchema().safeParse(rowValues)
        .success;
    },
  });
