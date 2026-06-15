import { ResumeFormValues } from "@/features/resume/schemas/resume.schema";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import {
  CustomResumeEditor,
  CustomResumeEditorClassNamesProps,
} from "../CustomResumeEditor";
import type { JSONContent } from "@tiptap/core";

type CustomControlledResumeSummaryProps = {
  name: FieldPath<ResumeFormValues>;
  label: string;
  classNames?: CustomResumeEditorClassNamesProps;
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

        return (
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
        );
      }}
    />
  );
};

export { CustomControlledResumeSummary };
