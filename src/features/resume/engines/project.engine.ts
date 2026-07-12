import {
  getStrictProjectSchema,
  ProjectRowValues,
} from "../schemas/ProjectsSchema";
import { createArrayStepEngine } from "../utils/formStatusEngine";
import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";

export const ProjectStatusEngine = createArrayStepEngine<ProjectRowValues>({
  isEmpty: isGenericRowEmpty,
  isComplete: (rowValues) => {
    if (!rowValues) return false;
    return getStrictProjectSchema().safeParse(rowValues).success;
  },
});
