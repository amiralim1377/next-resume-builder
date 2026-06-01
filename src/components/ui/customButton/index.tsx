"use client";
import { Ref, RefObject, useState } from "react";
import { CustomText } from "../CustomText";
import { cn } from "@/utils/cn";
import { useLang } from "@/provider/lngProvider";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { getFontFamily } from "@/utils/getFontFamily";
import { LoadingView } from "../CustomLoadingView";
import { useBoldFontWeight } from "@/hooks/useBoldFontWeight";

interface CustomButtonProps {
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "negative"
    | "outlined"
    | "outlined-brand"
    | "outlined-negative"
    | "simple";
  customRef?: Ref<HTMLButtonElement>;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onMouseLeave?: () => void;
  loadingOnClick?: boolean;
  "aria-label"?: string;
  loadingText?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
  size?: "lg" | "md";
}

const CustomButton = ({
  children,
  style,
  disabled,
  className,
  variant = "primary",
  customRef,
  type = "submit",
  loading,
  size,
  onClick,
  onMouseLeave,
  loadingOnClick,
  loadingText,
  ...rest
}: CustomButtonProps) => {
  const { lng } = useLang();
  const { colors } = useThemeColors();
  const { fontWeight } = useBoldFontWeight();
  const [permanentLoading, setPermanentLoading] = useState(false);

  const getBtnClassName = () => {
    switch (variant) {
      case "primary":
        return "text-[var(--color-inverse)]   bg-[var(--color-brandPrimary)] hover:bg-[var(--color-brandHover)] disabled:!bg-[var(--color-ui-divider)] disabled:text-[var(--color-text-muted)] disabled:cursor-default";

      case "secondary":
        return "bg-[var(--color-ui-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-brandPrimary)] hover:text-[var(--color-inverse)]";

      case "outlined":
        return "bg-[var(--color-ui-surface)] border border-[var(--color-ui-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-accentLight)] hover:text-[var(--color-brandPrimary)]";

      case "outlined-brand":
        return "bg-transparent border border-[var(--color-ui-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-accentLight)] hover:border-[var(--color-brandPrimary)] hover:text-[var(--color-brandPrimary)] disabled:!bg-[var(--color-ui-surface)] disabled:cursor-default disabled:opacity-70 disabled:hover:!bg-[var(--color-ui-surface)] disabled:hover:border-[var(--color-ui-border)]";

      case "negative":
        return "text-[var(--color-inverse)] bg-[var(--color-state-error)] hover:opacity-90";

      case "outlined-negative":
        return "bg-transparent text-[var(--color-state-error)] border border-[var(--color-state-error)] hover:bg-[var(--color-state-error)] hover:!text-[var(--color-inverse)]";

      case "simple":
        return "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-accentLight)]";

      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      ref={customRef as unknown as RefObject<HTMLButtonElement>}
      className={cn(
        "relative flex h-9 min-w-25 items-center justify-center rounded-sm border-0 px-4.5 text-[14px] hover:cursor-pointer active:translate-y-0.5 disabled:cursor-default disabled:!bg-[var(--disabledButton)] disabled:text-[var(--disabledText)] disabled:active:translate-y-0",
        size === "lg" ? "text-[20px]" : "",
        getBtnClassName(),
        className,
      )}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: disabled
          ? variant === "primary"
            ? `${colors.accent?.accent} !important`
            : colors.brand?.brandActive
          : undefined,
        color: disabled ? colors?.accent?.accent : undefined,
        pointerEvents: "all",
        fontWeight,
        fontFamily: getFontFamily(children),
        ...style,
      }}
      disabled={disabled}
      onClick={
        loading
          ? () => null
          : () => {
              onClick?.();
              if (loadingOnClick) setPermanentLoading(true);
            }
      }
      {...rest}
    >
      {loading || permanentLoading ? (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center gap-1.25",
            lng === "en" ? "flex-row-reverse" : "",
          )}
        >
          {loadingText ? (
            <CustomText className="text-text-primary text-[14px]">
              {loadingText}
            </CustomText>
          ) : null}
          <LoadingView color={colors.text?.primary} size={10} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export { CustomButton };
