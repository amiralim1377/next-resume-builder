import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, Path, useFormContext } from "react-hook-form";
import { CustomInput } from "../CustomInput";

type CustomControlledInputProps = {
  name: Path<ResumeFormValues>;
  label: string;
} & Omit<
  React.ComponentProps<typeof CustomInput>,
  "name" | "label" | "error" | "value" | "onChange" | "onBlur" | "ref"
>;
const CustomControlledInput = ({
  name,
  label,
  ...props
}: CustomControlledInputProps) => {
  const { control } = useFormContext<ResumeFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref, ...safeField } = field;

        const isValid = !fieldState.invalid && Boolean(field.value);

        return (
          <CustomInput
            label={label}
            isValid={isValid}
            error={fieldState.error?.message}
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

export { CustomControlledInput };
