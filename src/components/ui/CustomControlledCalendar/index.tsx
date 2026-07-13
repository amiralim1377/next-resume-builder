import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Calendar } from "../CustomCalendar/Calendar";
import { useState } from "react";
import { CustomInput } from "../CustomInput";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
  FloatingPortal,
  useClick,
} from "@floating-ui/react";

type CustomControlledCalendarProps = {
  name: FieldPath<ResumeFormValues>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
} & Omit<
  React.ComponentProps<typeof Calendar>,
  | "name"
  | "label"
  | "error"
  | "value"
  | "onChange"
  | "onBlur"
  | "ref"
  | "children"
>;

export const CustomControlledCalendar = ({
  name,
  label,
  placeholder,
  disabled,
  ...props
}: CustomControlledCalendarProps) => {
  const { control } = useFormContext<ResumeFormValues>();
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ fallbackPlacements: ["top-start"] }),
      shift({ padding: 8 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref } = field;

        const dateValue = value ? parseDate(value as string) : null;

        const displayLocale =
          props.calendarSystem === "persian" ? "fa-IR" : "en-US";

        const displayValue = dateValue
          ? new Intl.DateTimeFormat(displayLocale, {
              dateStyle: "long",
              calendar:
                props.calendarSystem === "persian" ? "persian" : "gregory",
            }).format(dateValue.toDate(getLocalTimeZone()))
          : "";

        const isValid = disabled || (!fieldState.invalid && Boolean(value));

        return (
          <div className="w-full">
            <div
              ref={refs.setReference}
              {...getReferenceProps()}
              className="w-full"
            >
              <CustomInput
                type="text"
                readOnly
                disabled={disabled}
                label={label}
                isValid={isValid}
                error={fieldState.error?.message}
                value={displayValue}
                placeholder={placeholder}
                onBlur={onBlur}
                className="w-full cursor-pointer rounded-md"
                ref={ref}
              />
            </div>

            <FloatingPortal>
              {isOpen && (
                <div
                  ref={refs.setFloating}
                  style={{
                    ...floatingStyles,
                    zIndex: 9999,
                  }}
                  {...getFloatingProps()}
                >
                  <Calendar
                    value={dateValue}
                    onChange={(date: unknown) => {
                      onChange(String(date));
                      setIsOpen(false);
                    }}
                    {...props}
                  >
                    <Calendar.Header />
                    <Calendar.Content />
                  </Calendar>
                </div>
              )}
            </FloatingPortal>
          </div>
        );
      }}
    />
  );
};
