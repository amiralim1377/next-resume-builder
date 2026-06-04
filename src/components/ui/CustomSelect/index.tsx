import { cn } from "@/utils/cn";
import React, { useId } from "react";

interface SelectOption {
  value: string | number;
  text: string;
}

type CustomSelectClassName = {
  label: string;
  select: string;
  option: string;
  error: string;
  errorContainer: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  label?: string;
  error?: undefined | string;
  options: SelectOption[];
  classNames?: CustomSelectClassName;
  ref?: React.Ref<HTMLSelectElement>;
};

const CustomSelect = ({
  className = "",
  classNames,
  label,
  error,
  options,
  ref,
  ...otherProps
}: SelectProps) => {
  const id = useId();

  return (
    <div
      className={cn("relative flex w-full flex-col bg-transparent", className)}
    >
      <label
        htmlFor={id}
        className={cn(
          "text-text-secondary pb-2 text-sm font-semibold text-nowrap",
          classNames?.label,
        )}
      >
        {label}
      </label>

      <select
        className={cn(
          "border-ui-border focus-visible:border-brandLight focus-visible:ring-brandPrimary focus:ring-brandActive text-text-secondary h-10 w-full cursor-pointer rounded-md border px-3 py-2 text-sm font-medium shadow-sm focus:ring focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50", // Added h-10
          classNames?.select,
        )}
        id={id}
        ref={ref}
        {...otherProps}
      >
        {options.map((opt, i) => (
          <option
            className={cn(
              "text-brandLight text-sm font-semibold",
              classNames?.option,
            )}
            key={`${id}-${i}`}
            value={opt.value}
          >
            {opt.text}
          </option>
        ))}
      </select>
      <div className={cn("mt-1 min-h-5", classNames?.errorContainer)}>
        {error && (
          <span
            className={cn(
              "text-state-error text-xs font-medium",
              classNames?.error,
            )}
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export { CustomSelect };
