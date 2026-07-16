// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSectionStatus } from "./useSectionStatus";
import { useFormContext, useWatch } from "react-hook-form";

vi.mock("react-hook-form", () => ({
  useFormContext: vi.fn(),
  useWatch: vi.fn(),
}));

describe("useSectionStatus Hook Tests", () => {
  it("should return empty status when form data is empty and no errors exist", () => {
    vi.mocked(useFormContext).mockReturnValue({
      formState: { errors: {} },
    } as unknown as ReturnType<typeof useFormContext>);

    vi.mocked(useWatch).mockReturnValue([{}]);

    const { result } = renderHook(() =>
      useSectionStatus("basicInfo", "basicInfo"),
    );

    expect(result.current).toBe("empty");
  });

  it("should return invalid status when formState contains errors", () => {
    vi.mocked(useFormContext).mockReturnValue({
      formState: { errors: { basicInfo: true } },
    } as unknown as ReturnType<typeof useFormContext>);

    vi.mocked(useWatch).mockReturnValue([{ firstName: "John" }]);

    const { result } = renderHook(() =>
      useSectionStatus("basicInfo", "basicInfo"),
    );

    expect(result.current).toBe("invalid");
  });
});
