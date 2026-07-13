import { RowStatus, StepStatus } from "../types/resume.types";

interface ArrayStepRules<T> {
  isEmpty: (row: T) => boolean;
  isComplete: (row: T) => boolean;
}

interface ObjectStepRules<T> {
  isEmpty: (data: T) => boolean;
  isComplete: (data: T) => boolean;
}

export const createArrayStepEngine = <T>(rules: ArrayStepRules<T>) => {
  const getRowStatus = (row: T, hasRowError?: boolean): RowStatus => {
    if (rules.isEmpty(row)) return "empty";
    if (hasRowError) return "invalid";
    if (rules.isComplete(row)) return "completed";
    return "draft";
  };

  const getStepStatus = (
    rows: T[] | undefined | null,
    hasStepError: boolean,
  ): StepStatus => {
    if (hasStepError) return "invalid";

    if (!rows || rows.length === 0) return "empty";

    const rowStatuses = rows.map((row) => getRowStatus(row, false));

    if (rowStatuses.includes("draft") || rowStatuses.includes("empty")) {
      return "draft";
    }

    if (rowStatuses.every((status) => status === "completed")) {
      return "completed";
    }

    return "draft";
  };

  return { getRowStatus, getStepStatus };
};

export const createObjectStepEngine = <T>(rules: ObjectStepRules<T>) => {
  const getStepStatus = (
    data: T | undefined | null,
    hasStepError: boolean,
  ): StepStatus => {
    if (hasStepError) return "invalid";
    if (!data || rules.isEmpty(data)) return "empty";
    if (rules.isComplete(data)) return "completed";

    return "draft";
  };

  return { getStepStatus };
};
