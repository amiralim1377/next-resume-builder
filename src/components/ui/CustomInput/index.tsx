import { cn } from "@/utils/cn";
import { InputHTMLAttributes, useId } from "react";

type CustomInputClassName = {
  label: string;
  input: string;
  error: string;
  errorContainer: string;
};

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  classNames?: CustomInputClassName;
}

export function CustomInput({
  label,
  error,
  id,
  className = "",
  classNames,
  ref,
  ...props
}: CustomInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div
      className={cn("relative flex w-full flex-col bg-transparent", className)}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-text-secondary pb-2 text-sm font-semibold",
            classNames?.label,
          )}
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          "text-text-secondary placeholder:text-text-secondary/25 h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-[11px] focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-state-error focus-visible:ring-state-error"
            : "border-ui-border focus-visible:border-brandLight focus-visible:ring-brandPrimary",
          classNames?.input,
        )}
        {...props}
      />

      <div className={cn("mt-1 min-h-5", classNames?.errorContainer)}>
        {error && (
          <span
            className={cn(
              "text-state-error text-xs font-medium",
              classNames?.error,
            )}
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
