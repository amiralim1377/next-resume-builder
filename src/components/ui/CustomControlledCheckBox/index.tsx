import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, Path, useFormContext } from "react-hook-form";
import { CustomCheckBox } from "../CustomCheckBox";

type CustomControlledCheckBoxProps = {
  name: Path<ResumeFormValues>;
  label: string;
} & Omit<
  React.ComponentProps<typeof CustomCheckBox>,
  "name" | "label" | "error" | "value" | "onChange" | "onBlur" | "ref"
>;
const CustomControlledCheckBox = ({
  name,
  label,
  ...props
}: CustomControlledCheckBoxProps) => {
  const { control } = useFormContext<ResumeFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ref, ...safeField } = field;

        const isValid = !fieldState.invalid && Boolean(field.value);

        return (
          <CustomCheckBox
            label={label}
            isValid={isValid}
            checked={!!field.value}
            error={fieldState.error?.message}
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

export { CustomControlledCheckBox };
