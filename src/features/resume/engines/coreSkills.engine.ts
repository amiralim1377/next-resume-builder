import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";

import { createArrayStepEngine } from "../utils/formStatusEngine";
import { getStrictSkillSchema, SkillsRowValues } from "../schemas/SkillsSchema";

const coreSkillStatusEngine = createArrayStepEngine<SkillsRowValues>({
  isEmpty: isGenericRowEmpty,
  isComplete: (rowValues) => {
    if (!rowValues) return false;
    return getStrictSkillSchema().safeParse(rowValues).success;
  },
});
export { coreSkillStatusEngine };
