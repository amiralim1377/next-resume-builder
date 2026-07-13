// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAutoSave } from "./useAutoSave";
import { useFormContext, useWatch, UseFormReturn } from "react-hook-form";
import { set } from "idb-keyval";

vi.mock("react-hook-form", () => ({
  useFormContext: vi.fn(),
  useWatch: vi.fn(),
}));

vi.mock("idb-keyval", () => ({
  set: vi.fn(),
}));

describe("useAutoSave Hook Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(useFormContext).mockReturnValue({
      control: {},
    } as unknown as UseFormReturn);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should transition through idle -> saving -> success -> idle states", async () => {
    const mockValues = { name: "John Doe" };
    vi.mocked(useWatch).mockReturnValue(mockValues);
    vi.mocked(set).mockResolvedValue();

    const { result } = renderHook(() => useAutoSave("test_key"));

    expect(result.current.status).toBe("idle");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.status).toBe("saving");

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.status).toBe("success");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.status).toBe("idle");
  });

  it("should handle error state correctly", async () => {
    vi.mocked(useWatch).mockReturnValue({ data: "test" });
    vi.mocked(set).mockRejectedValue(new Error("DB Error"));

    const { result } = renderHook(() => useAutoSave("test_key"));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.status).toBe("error");
  });
});
