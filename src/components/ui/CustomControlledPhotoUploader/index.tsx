import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { CustomPhotoUploader } from "../CustomPhotoUploader";

type CustomControlledPhotoUploaderProps = {
  name: FieldPath<ResumeFormValues>;
  label: string;
} & Omit<
  React.ComponentProps<typeof CustomPhotoUploader>,
  "name" | "label" | "error" | "isValid" | "value" | "onChange"
>;

const CustomControlledPhotoUploader = ({
  name,
  label,
  ...props
}: CustomControlledPhotoUploaderProps) => {
  const { control } = useFormContext<ResumeFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleChange = (file: File | undefined) => {
          field.onChange(file ?? undefined);
        };

        const isValid =
          !fieldState.invalid && fieldState.isDirty && !!field.value;

        return (
          <CustomPhotoUploader
            label={label}
            value={field.value as File | undefined}
            onChange={handleChange}
            error={fieldState.error?.message}
            isValid={isValid}
            {...props}
          />
        );
      }}
    />
  );
};

export { CustomControlledPhotoUploader };
