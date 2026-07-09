import {
  EducationRowValues,
  getStrictEducationSchema,
} from "../schemas/EducationSchema";
import { createArrayStepEngine } from "../utils/formStatusEngine";
import { isGenericRowEmpty } from "./generic.rules";

export const educationStatusEngine = createArrayStepEngine<EducationRowValues>({
  isEmpty: isGenericRowEmpty,
  isComplete: (rowValues) => {
    if (!rowValues) return false;
    return getStrictEducationSchema().safeParse(rowValues).success;
  },
});
