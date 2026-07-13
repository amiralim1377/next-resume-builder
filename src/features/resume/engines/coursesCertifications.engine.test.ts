import { describe, it, expect, vi, beforeEach } from "vitest";
import { CoursesCertificationsStatusEngine } from "./coursesCertifications.engine";
import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";
import { getStrictCoursesAndCertificationsSchema } from "../schemas/CoursesAndCertificationsSchema";

vi.mock("../utils/isGenericRowEmpty");
vi.mock("../schemas/CoursesAndCertificationsSchema");

describe("CoursesCertificationsStatusEngine", () => {
  const mockSafeParse = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getStrictCoursesAndCertificationsSchema).mockReturnValue({
      safeParse: mockSafeParse,
    } as unknown as ReturnType<typeof getStrictCoursesAndCertificationsSchema>);
  });

  it("should return 'empty' when no course rows exist", () => {
    const status = CoursesCertificationsStatusEngine.getStepStatus([], false);
    expect(status).toBe("empty");
  });

  it("should return 'draft' when the rows are added but completely empty", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(true);
    mockSafeParse.mockReturnValue({ success: false });

    const mockData = [{ coursesAndCertificationsName: "" }];
    const result = CoursesCertificationsStatusEngine.getStepStatus(
      mockData,
      false,
    );

    expect(result).toBe("draft");
  });

  it("should return 'draft' when rows are neither completely empty nor fully valid", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(false);
    mockSafeParse.mockReturnValue({ success: false });

    const mockData = [{ coursesAndCertificationsName: "Next.js Course" }];
    const status = CoursesCertificationsStatusEngine.getStepStatus(
      mockData,
      false,
    );

    expect(status).toBe("draft");
  });

  it("should return 'invalid' if there is a step error, even if rows seem valid", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(false);
    mockSafeParse.mockReturnValue({ success: true });

    const mockData = [{ coursesAndCertificationsName: "Valid Course Data" }];
    const status = CoursesCertificationsStatusEngine.getStepStatus(
      mockData,
      true,
    );

    expect(status).toBe("invalid");
  });

  it("should return 'completed' when all rows are valid according to schema and there are no errors", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(false);
    mockSafeParse.mockReturnValue({ success: true });

    const mockData = [
      {
        coursesAndCertificationsName: "React Clean Code",
        instituteName: "Coursera",
        certificateIssueDate: "2026-01-01",
        certificateUrl: "https://example.com/cert",
      },
    ];
    const status = CoursesCertificationsStatusEngine.getStepStatus(
      mockData,
      false,
    );

    expect(status).toBe("completed");
  });
});
