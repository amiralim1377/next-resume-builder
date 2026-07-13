import {
  getStrictResearchSchema,
  ResearchRowValues,
} from "../schemas/ResearchSchema";
import { createArrayStepEngine } from "../utils/formStatusEngine";
import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";

export const researchStatusEngine = createArrayStepEngine<ResearchRowValues>({
  isEmpty: isGenericRowEmpty,
  isComplete: (rowValues) => {
    if (!rowValues) return false;
    return getStrictResearchSchema().safeParse(rowValues).success;
  },
});
