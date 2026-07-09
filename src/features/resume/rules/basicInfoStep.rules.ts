import { createObjectStepEngine } from "../utils/formStatusEngine";
import { isGenericRowEmpty } from "./generic.rules";
import {
  BasicInfoRowValues,
  getStrictBasicInfoSchema,
} from "../schemas/BasicInfoSchema";

const basicInfoStatusEngine = createObjectStepEngine<BasicInfoRowValues>({
  isEmpty: isGenericRowEmpty,
  isComplete: (rowValues) => {
    if (!rowValues) return false;

    return getStrictBasicInfoSchema().safeParse(rowValues).success;
  },
});

export { basicInfoStatusEngine };
