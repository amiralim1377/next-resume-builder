import { ChangeEventHandler, ReactNode, useId } from "react";
import { CustomRadioGroup } from "./RadioGroup";
import { cn } from "@/utils/cn";

type CustomRadioPropsClassNames = {
  root?: string;
  radio?: string;
  label?: string;
  inner?: string;
};

export interface CustomRadioProps {
  checked?: boolean;
  className?: string;
  classNames?: CustomRadioPropsClassNames;
  color?: string;
  disabled?: boolean;
  iconColor?: string;
  label?: ReactNode;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  variant?: "filled" | "outline";
}

const CustomRadio = ({
  checked,
  className,
  classNames: customClassNames,
  color,
  disabled,
  iconColor,
  label,
  name,
  onChange,
  value,
  variant = "filled",
}: CustomRadioProps) => {
  const id = useId();
  return (
    <div
      className={cn("flex cursor-pointer", customClassNames?.root, className)}
    >
      <div className={cn("flex items-center gap-2", customClassNames?.inner)}>
        <input
          id={id}
          checked={checked}
          className={cn(
            "border-brandPrimary relative h-5 min-h-5 w-5 min-w-5 cursor-pointer rounded-full border bg-transparent transition-all duration-200 ease-in-out",
            customClassNames?.radio,
          )}
          disabled={disabled}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
          style={
            {
              "--radio-color": color,
              "--radio-icon-color": iconColor,
            } as React.CSSProperties
          }
          data-variant={variant}
        />
        {label && (
          <label
            className={cn(
              "text-brandPrimary cursor-pointer text-xs select-none",
              customClassNames?.label,
            )}
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

const CustomRadioWithGroup = Object.assign(CustomRadio, {
  Group: CustomRadioGroup,
});

export { CustomRadioWithGroup as CustomRadio };
