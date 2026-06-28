import { ChangeEvent, TextareaHTMLAttributes, useId } from "react";
import { cn } from "@/utils/cn";

export interface CustomTextareaStylesNames {
  root: string;
  wrapper: string;
  input: string;
  label: string;
  description: string;
  error: string;
  errorContainer: string;
  required: string;
  section: string;
}

export interface CustomTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  /** Textarea value for controlled input */
  value?: string;
  /** Default value for uncontrolled input */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Input label */
  label?: string;
  /** Input description */
  description?: string;
  /** Error message */
  error?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Maximum number of characters */
  maxLength?: number;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows */
  maxRows?: number;
  /** Whether textarea should auto-resize */
  autosize?: boolean;
  /** Whether the current value is valid (shows success ring) */
  isValid?: boolean;
  /** Custom class name for root element */
  className?: string;
  /** Custom class names for different parts */
  classNames?: Partial<Record<keyof CustomTextareaStylesNames, string>>;
}

const CustomTextarea = ({
  value,
  defaultValue,
  onChange,
  label,
  description,
  error,
  required,
  disabled,
  readOnly,
  placeholder,
  maxLength,
  minRows = 3,
  maxRows,
  autosize = false,
  isValid,
  className,
  classNames,
  id,
  ...rest
}: CustomTextareaProps) => {
  const generatedId = useId();
  const textareaId = id || generatedId;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div
      className={cn("relative flex w-full flex-col bg-transparent", className, classNames?.root)}
    >
      {label && (
        <label
          htmlFor={textareaId}
          className={cn(
            "text-text-secondary pb-2 text-sm font-semibold",
            classNames?.label,
          )}
        >
          {label}
          {required && (
            <span className={cn("text-state-error ms-0.5", classNames?.required)}>
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <div
          className={cn(
            "text-text-secondary mb-2 text-xs",
            classNames?.description,
          )}
        >
          {description}
        </div>
      )}

      <div className={cn("relative w-full", classNames?.wrapper)}>
        <textarea
          id={textareaId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={minRows}
          aria-invalid={!!error}
          className={cn(
            "text-text-secondary placeholder:text-text-secondary/25 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-[11px] focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-state-error focus-visible:ring-state-error",
            !error &&
              isValid &&
              "border-state-success focus-visible:ring-state-success focus-visible:border-state-success",
            !error &&
              !isValid &&
              "border-ui-border focus-visible:border-brandLight focus-visible:ring-brandPrimary",
            classNames?.input,
          )}
          style={{
            minHeight: autosize ? undefined : `${minRows * 24}px`,
            maxHeight: maxRows ? `${maxRows * 24}px` : undefined,
            resize: "none" as React.CSSProperties["resize"],
            verticalAlign: "bottom",
            ...rest.style,
          }}
          {...rest}
        />
      </div>

      <div className={cn("mt-1 min-h-5", classNames?.errorContainer)}>
        {error && (
          <span
            className={cn("text-state-error text-xs font-medium", classNames?.error)}
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export { CustomTextarea };
