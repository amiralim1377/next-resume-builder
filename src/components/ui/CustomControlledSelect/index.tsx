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
      render={({ field, fieldState: { error } }) => {
        const { value, onChange, onBlur, ref, ...safeField } = field;
        return (
          <CustomSelect
            error={error?.message}
            label={label}
            value={value as string | number | readonly string[] | undefined}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            {...safeField}
            {...props}
          />
        );
      }}
    />
  );
};

export { CustomControlledSelect };
