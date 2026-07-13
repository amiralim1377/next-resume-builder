import { describe, it, expect } from "vitest";
import { CoursesCertificationsStatusEngine } from "./coursesCertifications.engine";

describe("Courses & Certifications Status Engine Tests", () => {
  it("should return empty when the rows are empty", () => {
    const mockEmptyData = [
      { coursesAndCertificationsName: "", institutionName: "" },
    ];
    const hasError = false;

    const result = CoursesCertificationsStatusEngine.getStepStatus(
      mockEmptyData,
      hasError,
    );

    expect(result).toBe("empty");
  });

  it("should return invalid when form validation errors exist", () => {
    const mockData = [
      { coursesAndCertificationsName: "React Course", institutionName: "" },
    ];
    const hasError = true;

    const result = CoursesCertificationsStatusEngine.getStepStatus(
      mockData,
      hasError,
    );

    expect(result).toBe("invalid");
  });

  it("should return completed when fields satisfy the strict validation schema", () => {
    const mockCompleteData = [
      {
        coursesAndCertificationsName: "Senior Frontend Engineering Course",
        institutionName: "Alpha Educational Institute",
      },
    ];
    const hasError = false;

    const result = CoursesCertificationsStatusEngine.getStepStatus(
      mockCompleteData,
      hasError,
    );

    expect(result).toBe("completed");
  });
});
