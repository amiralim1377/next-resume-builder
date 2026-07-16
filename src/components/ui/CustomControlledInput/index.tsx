import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { CustomInput } from "../CustomInput";

type CustomControlledInputProps = {
  name: FieldPath<ResumeFormValues>;
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
  const { control, trigger } = useFormContext<ResumeFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref, ...safeField } = field;

        const isValid = !fieldState.invalid && Boolean(field.value);

        const handleChange = async (value: unknown) => {
          onChange(value);
          await trigger(name);
        };

        return (
          <CustomInput
            label={label}
            isValid={isValid}
            error={fieldState.error?.message}
            value={value as string | number | readonly string[] | undefined}
            onChange={handleChange}
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
