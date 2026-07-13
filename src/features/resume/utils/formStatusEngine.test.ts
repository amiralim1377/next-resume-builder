import { describe, it, expect } from "vitest";
import {
  createArrayStepEngine,
  createObjectStepEngine,
} from "./formStatusEngine";

type MockData = { title: string };

describe("formStatusEngine", () => {
  describe("createArrayStepEngine", () => {
    const arrayRules = {
      isEmpty: (row: MockData) => row.title === "",
      isComplete: (row: MockData) => row.title.length > 3,
    };

    const arrayEngine = createArrayStepEngine<MockData>(arrayRules);

    it("should return 'invalid' if the step has a direct error", () => {
      const status = arrayEngine.getStepStatus([{ title: "Valid" }], true);
      expect(status).toBe("invalid");
    });

    it("should return 'empty' only if the array is null, undefined, or has length 0", () => {
      expect(arrayEngine.getStepStatus([], false)).toBe("empty");
      expect(arrayEngine.getStepStatus(null, false)).toBe("empty");
      expect(arrayEngine.getStepStatus(undefined, false)).toBe("empty");
    });

    it("should return 'draft' if rows are created but all of them are entirely empty", () => {
      const mockRows = [{ title: "" }, { title: "" }];
      const status = arrayEngine.getStepStatus(mockRows, false);
      expect(status).toBe("draft");
    });

    it("should return 'draft' if some rows are completed but others are empty", () => {
      const mockRows = [{ title: "Perfect Title" }, { title: "" }];
      const status = arrayEngine.getStepStatus(mockRows, false);
      expect(status).toBe("draft");
    });

    it("should return 'draft' if a row is partially filled (neither empty nor complete)", () => {
      const mockRows = [{ title: "ab" }];
      const status = arrayEngine.getStepStatus(mockRows, false);
      expect(status).toBe("draft");
    });

    it("should return 'completed' if all created rows are fully valid", () => {
      const mockRows = [{ title: "Software Engineer" }, { title: "React Dev" }];
      const status = arrayEngine.getStepStatus(mockRows, false);
      expect(status).toBe("completed");
    });
  });

  describe("createObjectStepEngine", () => {
    const objectRules = {
      isEmpty: (data: MockData) => data.title === "",
      isComplete: (data: MockData) => data.title.length > 3,
    };

    const objectEngine = createObjectStepEngine<MockData>(objectRules);

    it("should return 'invalid' if the step has a direct error", () => {
      const status = objectEngine.getStepStatus({ title: "Valid" }, true);
      expect(status).toBe("invalid");
    });

    it("should return 'empty' if the object is null, undefined, or its fields are empty", () => {
      expect(objectEngine.getStepStatus(null, false)).toBe("empty");
      expect(objectEngine.getStepStatus(undefined, false)).toBe("empty");
      expect(objectEngine.getStepStatus({ title: "" }, false)).toBe("empty");
    });

    it("should return 'draft' if the object fields are partially filled", () => {
      const status = objectEngine.getStepStatus({ title: "ab" }, false);
      expect(status).toBe("draft");
    });

    it("should return 'completed' if the object is fully valid", () => {
      const status = objectEngine.getStepStatus({ title: "Front-end" }, false);
      expect(status).toBe("completed");
    });
  });
});
