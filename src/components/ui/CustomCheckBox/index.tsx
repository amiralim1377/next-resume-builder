import { ChangeEvent, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Language } from "@/lib/i18n/settings";

type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";

interface CheckboxStylesNames {
  root?: string;
  input?: string;
  icon?: string;
  inner?: string;
  body?: string;
  labelWrapper?: string;
  label?: string;
  description?: string;
  error?: string;
}

export interface CustomCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  classNames?: CheckboxStylesNames;
  size?: CheckboxSize;
  id?: string;
  name?: string;
  value?: string | number | readonly string[];
  required?: boolean;
  error?: ReactNode;
  description?: ReactNode;
  lng?: Language;
  isValid?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const CustomCheckBox = ({
  checked,
  onChange,
  onBlur,
  label,
  disabled,
  className,
  lng,
  classNames: customClassNames,
  size = "md",
  isValid,
  id,
  name,
  value,
  required,
  error,
  ref,
  description,
}: CustomCheckboxProps) => {
  const isFarsi = lng === "fa";

  const sizeClasses = {
    xs: "w-4 h-4 min-w-4 min-h-4",
    sm: "w-[18px] h-[18px] min-w-[18px] min-h-[18px]",
    md: "w-5 h-5 min-w-5 min-h-5",
    lg: "w-6 h-6 min-w-6 min-h-6",
    xl: "w-7 h-7 min-w-7 min-h-7",
  };

  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex flex-col",
        className,
        customClassNames?.root,
        disabled && "text-disabledButton cursor-not-allowed",
      )}
    >
      <div className={cn("flex items-start gap-2", customClassNames?.body)}>
        <div
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center",
            customClassNames?.inner,
          )}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={cn(
              "peer appearance-none rounded-sm border transition-colors",
              sizeClass,
              error && "border-state-error focus-visible:ring-1 focus-visible:ring-state-error",
              !error &&
                isValid &&
                "border-state-success focus-visible:ring-1 focus-visible:ring-state-success focus-visible:border-state-success",
              !error &&
                !isValid &&
                "border-ui-border focus-visible:border-brandLight focus-visible:ring-1 focus-visible:ring-brandPrimary",
              "checked:border-brandPrimary checked:bg-brandPrimary",
              customClassNames?.input,
            )}
            id={id}
            name={name}
            value={value}
            required={required}
            ref={ref}
          />
          <svg
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "text-inverse pointer-events-none absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 ease-in-out peer-checked:opacity-100",
              customClassNames?.icon,
            )}
          >
            <path
              d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {(label || description) && (
          <div
            className={cn(
              "flex flex-col gap-1",
              customClassNames?.labelWrapper,
            )}
          >
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "text-text-primary cursor-pointer text-sm whitespace-nowrap select-none",
                  isFarsi && "ms-0.5",
                  customClassNames?.label,
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <div
                className={cn(
                  "text-accent text-xs",
                  customClassNames?.description,
                )}
              >
                {description}
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <div
          className={cn("text-state-error text-xs", customClassNames?.error)}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export { CustomCheckBox };
