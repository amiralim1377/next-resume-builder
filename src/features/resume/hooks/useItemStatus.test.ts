// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useItemStatus } from "./useItemStatus";
import { RowStatus } from "../types/resume.types";

interface MockDataType {
  id: number;
  name?: string;
}

describe("useItemStatus Hook Tests", () => {
  const mockEngine = {
    getRowStatus:
      vi.fn<(d: MockDataType | undefined, e: boolean) => RowStatus>(),
  };

  it("should return the status provided by the engine", () => {
    mockEngine.getRowStatus.mockReturnValue("completed");
    const mockData: MockDataType = { id: 1, name: "Test Item" };

    const { result } = renderHook(() =>
      useItemStatus(mockData, false, mockEngine),
    );

    expect(result.current).toBe("completed");
    expect(mockEngine.getRowStatus).toHaveBeenCalledWith(mockData, false);
  });

  it("should recalculate status when data or error state changes", () => {
    mockEngine.getRowStatus.mockReturnValue("empty");

    const { result, rerender } = renderHook(
      ({
        data,
        hasError,
      }: {
        data: MockDataType | undefined;
        hasError: boolean;
      }) => useItemStatus(data, hasError, mockEngine),
      {
        initialProps: {
          data: undefined as MockDataType | undefined, // 🌟 مشخص کردن صریح تایپ برای جلوگیری از استنتاج فقط undefined
          hasError: false,
        },
      },
    );

    expect(result.current).toBe("empty");

    mockEngine.getRowStatus.mockReturnValue("invalid");
    const updatedData: MockDataType = { id: 2 };
    rerender({ data: updatedData, hasError: true });

    expect(result.current).toBe("invalid");
    expect(mockEngine.getRowStatus).toHaveBeenCalledWith(updatedData, true);
  });
});
