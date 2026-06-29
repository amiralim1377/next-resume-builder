import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Calendar } from "../CustomCalendar/Calendar";
import { useRef, useState } from "react";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { CustomInput } from "../CustomInput";
import { useLang } from "@/provider/lngProvider";

type CustomControlledCalendarProps = {
  name: FieldPath<ResumeFormValues>;
  label: string;
  placeholder?: string;
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
  ...props
}: CustomControlledCalendarProps) => {
  const { control } = useFormContext<ResumeFormValues>();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lng } = useLang();

  useOnClickOutside(containerRef, () => setIsOpen(false));

  // const calendarSystem = lng === "fa" ? "persian" : "gregorian";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref } = field;

        const dateValue = value ? parseDate(value as string) : null;

        // Format display value based on calendarSystem prop
        const displayLocale = props.calendarSystem === "persian" ? "fa-IR" : "en-US";
        
        const displayValue = dateValue
          ? new Intl.DateTimeFormat(displayLocale, {
              dateStyle: "long",
              calendar: props.calendarSystem === "persian" ? "persian" : "gregory",
            }).format(dateValue.toDate(getLocalTimeZone()))
          : "";

        const isValid = !fieldState.invalid && Boolean(value);

        return (
          <div className="relative w-full">
            <CustomInput
              type="text"
              readOnly
              label={label}
              isValid={isValid}
              error={fieldState.error?.message}
              value={displayValue}
              placeholder={placeholder}
              onClick={() => setIsOpen(!isOpen)}
              onBlur={onBlur}
              className="w-full cursor-pointer rounded-md"
              ref={ref}
            />

            {isOpen && (
              <div className="absolute z-50 mt-1 w-full">
                <Calendar
                  ref={containerRef}
                  value={dateValue}
                  onChange={(date) => {
                    onChange(date.toString());
                    setIsOpen(false);
                  }}
                  {...props}
                >
                  <Calendar.Header />
                  <Calendar.Content />
                </Calendar>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
