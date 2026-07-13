import { describe, it, expect } from "vitest";
import { basicInfoStatusEngine } from "./basicInfoStep.engine";

describe("Basic Info Status Engine Tests", () => {
  it("should return empty when the object is empty", () => {
    const mockEmptyData = {};
    const hasError = false;

    const result = basicInfoStatusEngine.getStepStatus(
      // eslint-disable-next-line
      mockEmptyData as any,
      hasError,
    );

    expect(result).toBe("empty");
  });

  it("should return invalid when form validation errors exist", () => {
    const mockData = {
      firstName: "John",
      lastName: "",
    };
    const hasError = true;

    const result = basicInfoStatusEngine.getStepStatus(
      // eslint-disable-next-line
      mockData as any,
      hasError,
    );

    expect(result).toBe("invalid");
  });

  it("should return draft when fields do not fully satisfy the strict validation schema", () => {
    const mockCompleteData = {
      firstName: "John",
      lastName: "Doe",
      jobTitle: "Senior Frontend Developer",
      sex: "male",
      maritalStatus: "single",
      militaryServiceStatus: "exempt",
      email: "john.doe@example.com",
      birthDate: "1996-07-13",
      mobileNumber: "09123456789",
      location: {
        country: "Iran",
        city: "Tehran",
      },
    };
    const hasError = false;

    const result = basicInfoStatusEngine.getStepStatus(
      // eslint-disable-next-line
      mockCompleteData as any,
      hasError,
    );

    expect(result).toBe("draft");
  });
});
