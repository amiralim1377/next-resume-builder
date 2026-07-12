import { createObjectStepEngine } from "../utils/formStatusEngine";
import {
  BasicInfoRowValues,
  getStrictBasicInfoSchema,
} from "../schemas/BasicInfoSchema";
import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";

const basicInfoStatusEngine = createObjectStepEngine<BasicInfoRowValues>({
  isEmpty: isGenericRowEmpty,
  isComplete: (rowValues) => {
    if (!rowValues) return false;

    return getStrictBasicInfoSchema().safeParse(rowValues).success;
  },
});

export { basicInfoStatusEngine };
