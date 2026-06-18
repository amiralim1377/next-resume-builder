import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import {
  CustomResumeEditor,
  CustomResumeEditorClassNamesProps,
} from "../CustomResumeEditor";
import type { JSONContent } from "@tiptap/core";
import { CustomText } from "../CustomText";
import { cn } from "@/utils/cn";

type CustomControlledResumeSummaryProps = {
  name: FieldPath<ResumeFormValues>;
  label: string;
  classNames?: CustomResumeEditorClassNamesProps;
  description?: string;
  descriptionClassName?: string;
} & Omit<
  React.ComponentProps<typeof CustomResumeEditor>,
  | "name"
  | "label"
  | "error"
  | "value"
  | "onChange"
  | "onBlur"
  | "ref"
  | "isValid"
>;
const CustomControlledResumeSummary = ({
  name,
  label,
  classNames,
  description,
  descriptionClassName,

  ...props
}: CustomControlledResumeSummaryProps) => {
  const { control } = useFormContext<ResumeFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, ...safeField } = field;

        const isValid = !fieldState.invalid && Boolean(field.value);

        console.log(value);
        console.log("resume:", fieldState.error);

        return (
          <>
            {description && (
              <CustomText className={cn(descriptionClassName)}>
                {description}
              </CustomText>
            )}
            <CustomResumeEditor
              label={label}
              value={value as JSONContent | null}
              onChange={(content: JSONContent) => onChange(content)}
              error={fieldState.error?.message}
              isValid={isValid}
              classNames={classNames}
              {...safeField}
              {...props}
            />
          </>
        );
      }}
    />
  );
};

export { CustomControlledResumeSummary };
