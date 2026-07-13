import { describe, it, expect, vi, beforeEach } from "vitest";
import { skillsStepStatusEngine } from "./skillsStep.engine";
import { CoursesCertificationsStatusEngine } from "./coursesCertifications.engine";
import { coreSkillStatusEngine } from "./coreSkills.engine";

vi.mock("./coursesCertifications.engine");
vi.mock("./coreSkills.engine");

describe("skillsStepStatusEngine", () => {
  const mockRowsData: [unknown, unknown, unknown] = [[], [], []];
  const mockErrorsArray: [boolean, boolean, boolean] = [false, false, false];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 'draft' if any of the sub-sections are in 'draft' status", () => {
    vi.mocked(CoursesCertificationsStatusEngine.getStepStatus).mockReturnValue(
      "draft",
    );
    vi.mocked(coreSkillStatusEngine.getStepStatus).mockReturnValue("completed");

    const status = skillsStepStatusEngine.getStepStatus(
      mockRowsData,
      mockErrorsArray,
    );

    expect(status).toBe("draft");
  });

  it("should return 'empty' when all sub-sections are 'empty'", () => {
    vi.mocked(CoursesCertificationsStatusEngine.getStepStatus).mockReturnValue(
      "empty",
    );
    vi.mocked(coreSkillStatusEngine.getStepStatus).mockReturnValue("empty");

    const status = skillsStepStatusEngine.getStepStatus(
      mockRowsData,
      mockErrorsArray,
    );

    expect(status).toBe("empty");
  });

  it("should return 'completed' when all sub-sections are 'completed'", () => {
    vi.mocked(CoursesCertificationsStatusEngine.getStepStatus).mockReturnValue(
      "completed",
    );
    vi.mocked(coreSkillStatusEngine.getStepStatus).mockReturnValue("completed");

    const status = skillsStepStatusEngine.getStepStatus(
      mockRowsData,
      mockErrorsArray,
    );

    expect(status).toBe("completed");
  });

  it("should return 'completed' if one section is 'completed' and the other is 'empty'", () => {
    vi.mocked(CoursesCertificationsStatusEngine.getStepStatus).mockReturnValue(
      "completed",
    );
    vi.mocked(coreSkillStatusEngine.getStepStatus).mockReturnValue("empty");

    const status = skillsStepStatusEngine.getStepStatus(
      mockRowsData,
      mockErrorsArray,
    );

    expect(status).toBe("completed");
  });
});
