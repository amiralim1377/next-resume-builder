"use client";

import { CSSProperties, ReactNode, RefObject } from "react";
import { CustomLink } from "../customLink";
import { cn } from "@/utils/cn";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { useBoldFontWeight } from "@/hooks/useBoldFontWeight";
import { getFontFamily } from "@/utils/getFontFamily";

interface StyledLinkProps {
  className?: string;
  customRef?: React.Ref<HTMLDivElement>;
  children?: ReactNode;
  disabled?: boolean;
  href?: string;
  loading?: boolean;
  onClick?: () => void;
  onMouseLeave?: () => void;
  style?: CSSProperties;
  target?: string;

  variant?:
    | "primary"
    | "secondary"
    | "negative"
    | "outlined"
    | "outlined-brand"
    | "outlined-negative"
    | "outlined-primary"
    | "simple";
}

const StyledLink = ({
  className,
  customRef,
  children,
  disabled,
  href,
  loading,
  onClick,
  onMouseLeave,
  style,
  target,
  variant = "primary",
}: StyledLinkProps) => {
  const { colors } = useThemeColors();
  const { fontWeight } = useBoldFontWeight();

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

  const buttonStyle = {
    backgroundColor: disabled
      ? variant === "primary"
        ? `${colors?.accent?.accent} !important`
        : colors.brand?.brandActive
      : undefined,
    color: disabled ? colors.accent?.accent : undefined,
    fontFamily: getFontFamily(children),
    fontWeight,
    ...style,
  };

  return (
    <CustomLink
      className={cn(
        "text-brandPrimary disabled:bg-disabledButton disabled:text-disabledText relative flex min-w-25 items-center justify-center rounded-sm px-3 py-2 text-sm no-underline disabled:cursor-default disabled:hover:scale-100",
        getBtnClassName(),
        className,
      )}
      href={href || "#"}
      onClick={
        loading
          ? () => null
          : () => {
              onClick?.();
            }
      }
      onMouseLeave={onMouseLeave}
      ref={customRef as unknown as RefObject<HTMLAnchorElement>}
      style={buttonStyle}
      target={target}
    >
      {children}
    </CustomLink>
  );
};

export { StyledLink };
