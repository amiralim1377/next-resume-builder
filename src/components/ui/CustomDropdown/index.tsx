"use client";
import { useHover } from "@/hooks/useHover";
import { cn } from "@/utils/cn";
import { CSSProperties, Fragment, ReactNode } from "react";
import { CustomLink } from "../CustomLink";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { ChevronDown } from "@/components/svg/ChevronDown";
import { useRouter } from "next/navigation";

type CustomDropdownClassNames = {
  container: string;
  titleContainer: string;
  title: string;
  dropdownClassName: string;
};

type CustomDropdownProps = {
  title?: ReactNode;
  children?: ReactNode;
  shouldOpen?: boolean; // for development
  hasIcon?: boolean;
  href?: string;
  inTransparentBackGround?: boolean;
  classNames: CustomDropdownClassNames;
  titleFontSize?: string;
  titleContainerStyle?: CSSProperties;
  isInMainHeader: boolean;
};

const CustomDropdown = ({
  title,
  children,
  hasIcon,
  href,
  inTransparentBackGround,
  classNames,
  shouldOpen,
  isInMainHeader = false,
  titleFontSize,
  titleContainerStyle,
}: CustomDropdownProps) => {
  const { ref, hovered } = useHover();
  const { colors } = useThemeColors();
  const isOpen = shouldOpen || hovered;
  const router = useRouter();

  const handleActivate = () => {
    if (href) router.push(href);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // prevent page scroll on Space
      handleActivate();
    }
  };

  const titleElement =
    typeof title === "string" ? (
      <Fragment>
        {title}
        {hasIcon && (
          <ChevronDown
            fill={
              isOpen
                ? colors.brand?.brandLight
                : inTransparentBackGround
                  ? colors.text?.brandText
                  : colors.text?.inverse
            }
            stroke={
              isOpen
                ? colors.brand?.brandLight
                : inTransparentBackGround
                  ? colors.text?.brandText
                  : colors.text?.inverse
            }
            size={10}
            className={
              isOpen
                ? "ms-1.25 rotate-180 transition-all duration-300"
                : "ms-1.25 transition-all duration-300"
            }
          />
        )}
      </Fragment>
    ) : (
      title
    );

  return (
    <div
      className={cn(
        "text-brandPrimary fill-brandPrimary relative flex h-16 cursor-pointer items-center justify-center",
        classNames?.container,
      )}
      ref={ref}
    >
      {href ? (
        <CustomLink
          className={
            typeof title === "string"
              ? cn(
                  "flex h-6 items-center justify-between",
                  classNames?.titleContainer,
                  "text-sm text-inherit",
                  classNames?.title,
                )
              : cn("flex h-6 justify-center", classNames?.titleContainer)
          }
          href={href}
          style={{
            color: isOpen ? colors.brand?.brandActive : undefined,
            fontSize: titleFontSize,
            ...titleContainerStyle,
          }}
        >
          {titleElement}
        </CustomLink>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={handleActivate}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-6 items-center justify-between",
            classNames?.titleContainer,
            "text-sm text-inherit",
            classNames?.title,
          )}
          style={{
            color: isOpen ? colors?.reverse?.text.brandText : undefined,
            fontSize: titleFontSize,
            ...titleContainerStyle,
            cursor: "pointer",
          }}
        >
          {titleElement}
        </div>
      )}
      <div
        className={
          isInMainHeader
            ? cn(
                "bg-dropdown animate-dropdown absolute -inset-s-12.5 inset-e-auto top-15 z-1001 transform-[translateZ(0)] rounded-md p-2.5 will-change-transform backface-hidden [&>a:last-of-type>div]:border-b-0!",
                classNames?.dropdownClassName,
              )
            : ""
        }
        style={isOpen ? { display: "block" } : { display: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

export { CustomDropdown };
