import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, Path, useFormContext } from "react-hook-form";
import { CustomSelect } from "../CustomSelect";

type CustomControlledSelectProps = {
  name: Path<ResumeFormValues>;
  label: string;
} & Omit<
  React.ComponentProps<typeof CustomSelect>,
  "name" | "label" | "error" | "value" | "onChange" | "onBlur" | "ref"
>;
const CustomControlledSelect = ({
  name,
  label,
  ...props
}: CustomControlledSelectProps) => {
  const { control } = useFormContext<ResumeFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref, ...safeField } = field;

        const isValid = !fieldState.invalid && Boolean(field.value);

        return (
          <CustomSelect
            error={fieldState?.error?.message}
            label={label}
            value={value as string | number | readonly string[] | undefined}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            isValid={isValid}
            {...safeField}
            {...props}
          />
        );
      }}
    />
  );
};

export { CustomControlledSelect };
