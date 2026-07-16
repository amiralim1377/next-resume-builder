import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { CustomPhotoUploader } from "../CustomPhotoUploader";

type CustomControlledPhotoUploaderProps = {
  name: FieldPath<ResumeFormValues>;
  label: string;
  isImageUploading?: boolean;
  onUploadProcess?: (file: File) => Promise<string | null>;
} & Omit<
  React.ComponentProps<typeof CustomPhotoUploader>,
  "name" | "label" | "error" | "isValid" | "value" | "onChange"
>;

const CustomControlledPhotoUploader = ({
  name,
  label,
  isImageUploading,
  onUploadProcess,
  ...props
}: CustomControlledPhotoUploaderProps) => {
  const { control } = useFormContext<ResumeFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleChange = async (file: File | undefined) => {
          if (!file) {
            field.onChange(undefined);
            return;
          }

          if (onUploadProcess) {
            try {
              const uploadedUrl = await onUploadProcess(file);

              if (uploadedUrl) {
                field.onChange(uploadedUrl);
              }
            } catch (error) {
              console.error("خطا در فرآیند آپلود:", error);
            }
          } else {
            field.onChange(file);
          }
        };

        const isValid =
          !fieldState.invalid && fieldState.isDirty && !!field.value;

        return (
          <CustomPhotoUploader
            isImageUploading={isImageUploading}
            label={label}
            value={field.value as string | File | undefined}
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
