"use client";

import { cn } from "@/utils/cn";

type Props = {
  isDraft: boolean;
  isInvalid: boolean;
  isCompleted: boolean;
  isActive: boolean;
  isEmpty: boolean;
};

export const ConnectorLine = ({
  isDraft,
  isInvalid,
  isCompleted,
  isActive,
  isEmpty,
}: Props) => {
  return (
    <div
      className={cn(
        "absolute top-4 z-0 h-0.5 w-full transition-all duration-300 ltr:left-1/2 rtl:right-1/2",
        isEmpty && "bg-gray-200",
        isDraft && !isInvalid && "bg-state-warning",
        isCompleted && "bg-teal-600",
        isInvalid && "bg-state-error",
        isActive && "bg-blue-600",
      )}
    />
  );
};
