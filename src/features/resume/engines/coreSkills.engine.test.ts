import { describe, it, expect, vi, beforeEach } from "vitest";
import { coreSkillStatusEngine } from "./coreSkills.engine";
import { isGenericRowEmpty } from "../utils/isGenericRowEmpty";
import { getStrictSkillSchema } from "../schemas/SkillsSchema";

vi.mock("../utils/isGenericRowEmpty");
vi.mock("../schemas/SkillsSchema");

describe("coreSkillStatusEngine", () => {
  const mockSafeParse = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getStrictSkillSchema).mockReturnValue({
      safeParse: mockSafeParse,
    } as unknown as ReturnType<typeof getStrictSkillSchema>);
  });

  it("should return 'empty' when skill rows are entirely empty", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(true);
    mockSafeParse.mockReturnValue({ success: false });

    const mockData = [{ skillName: "", skillLevel: "" }];
    const status = coreSkillStatusEngine.getStepStatus(mockData, false);

    expect(status).toBe("empty");
  });

  it("should return 'draft' when user has filled some fields but schema validation fails", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(false);
    mockSafeParse.mockReturnValue({ success: false });

    const mockData = [{ skillName: "TypeScript", skillLevel: "" }];
    const status = coreSkillStatusEngine.getStepStatus(mockData, false);

    expect(status).toBe("draft");
  });

  it("should return 'invalid' if there is an active validation error on the step", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(false);
    mockSafeParse.mockReturnValue({ success: true });

    const mockData = [{ skillName: "React", skillLevel: "Expert" }];
    const status = coreSkillStatusEngine.getStepStatus(mockData, true);

    expect(status).toBe("invalid");
  });

  it("should return 'completed' when all skill rows are fully valid and error-free", () => {
    vi.mocked(isGenericRowEmpty).mockReturnValue(false);
    mockSafeParse.mockReturnValue({ success: true });

    const mockData = [{ skillName: "Node.js", skillLevel: "Intermediate" }];
    const status = coreSkillStatusEngine.getStepStatus(mockData, false);

    expect(status).toBe("completed");
  });
});
