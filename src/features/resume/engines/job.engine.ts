import { getStrictJobSchema, JobRowValues } from "../schemas/JobSchema";
import { createArrayStepEngine } from "../utils/formStatusEngine";
import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";

export const jobStatusEngine = createArrayStepEngine<JobRowValues>({
  isEmpty: isGenericRowEmpty,
  isComplete: (rowValues) => {
    if (!rowValues) return false;
    return getStrictJobSchema().safeParse(rowValues).success;
  },
});
