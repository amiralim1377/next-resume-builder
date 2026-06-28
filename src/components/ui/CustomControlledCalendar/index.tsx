import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useTranslation } from "react-i18next";
import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Calendar } from "../CustomCalendar/Calendar";
import { useRef, useState } from "react";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { CustomInput } from "../CustomInput";
import { CustomLabel } from "../CustomLabel";
import { useLang } from "@/provider/lngProvider";

type CustomControlledCalendarProps = {
  name: FieldPath<ResumeFormValues>;
  label: string;
  placeholder?: string;
} & Omit<
  React.ComponentProps<typeof Calendar>,
  "value" | "onChange" | "children"
>;

export const CustomControlledCalendar = ({
  name,
  label,
  placeholder,
}: CustomControlledCalendarProps) => {
  const { control } = useFormContext<ResumeFormValues>();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lng } = useLang();

  useOnClickOutside(containerRef, () => setIsOpen(false));

  const calendarSystem = lng === "fa" ? "persian" : "gregorian";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const dateValue = field.value ? parseDate(field.value as string) : null;

        const displayValue = dateValue
          ? new Intl.DateTimeFormat(
              i18n.language === "fa" ? "fa-IR" : "en-US",
              {
                dateStyle: "long",
              },
            ).format(dateValue.toDate(getLocalTimeZone()))
          : "";

        return (
          <div ref={containerRef} className="relative w-full">
            <CustomLabel size="sm" className="pb-2">
              {label}
            </CustomLabel>
            <CustomInput
              type="text"
              readOnly
              value={displayValue}
              placeholder={placeholder}
              onClick={() => setIsOpen(!isOpen)}
              className="w-full cursor-pointer rounded-md"
            />

            {isOpen && (
              <div className="absolute z-50 w-full">
                <Calendar
                  value={dateValue}
                  calendarSystem={calendarSystem}
                  onChange={(date) => {
                    field.onChange(date.toString());
                    setIsOpen(false);
                  }}
                >
                  <Calendar.Header />
                  <Calendar.Content />
                </Calendar>
              </div>
            )}

            {fieldState.error && (
              <span className="text-state-error text-sm font-medium">
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
