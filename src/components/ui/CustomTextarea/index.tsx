import { ChangeEvent, TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface CustomTextareaStylesNames {
  root: string;
  wrapper: string;
  input: string;
  label: string;
  description: string;
  error: string;
  required: string;
  section: string;
}

export interface CustomTextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> {
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
  className,
  classNames,
  ...rest
}: CustomTextareaProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  const textareaProps = {
    ...rest,
    value,
    defaultValue,
    onChange: handleChange,
    disabled,
    readOnly,
    placeholder,
    maxLength,
    rows: minRows,
    className: cn(
      "w-full bg-transparent border border-border p-3 text-sm min-w-30 overflow-auto",
      classNames?.input,
    ),
    style: {
      minHeight: autosize ? undefined : `${minRows * 24}px`,
      maxHeight: maxRows ? `${maxRows * 24}px` : undefined,
      resize: "none" as React.CSSProperties["resize"],
      ...rest.style,
    },
  };

  return (
    <div className={cn("relative w-full", className, classNames?.root)}>
      {label && (
        <label
          className={cn(
            "text-text-primary ms-1.25 mb-2 block text-sm font-medium",
            classNames?.label,
          )}
        >
          {label}
          {required && (
            <span className={cn("text-disabledText", classNames?.required)}>
              {" "}
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <div
          className={cn(
            "text-text-secondary ms-1.25 mb-2 text-xs",
            classNames?.description,
          )}
        >
          {description}
        </div>
      )}

      <div className={cn("relative w-full", classNames?.wrapper)}>
        <textarea
          {...textareaProps}
          style={{ ...textareaProps.style, verticalAlign: "bottom" }}
        />
      </div>

      {error && (
        <div
          className={cn(
            "text-state-error ms-1.25 mt-1 text-xs",
            classNames?.error,
          )}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export { CustomTextarea };
