import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, HTMLProps, Ref } from "react";
import { UrlObject } from "url";
import { cn } from "@/utils/cn";
import { getFontFamily } from "@/utils/getFontFamily";
import { ClickEffect } from "../CustomClickEffect";
import { usePageLoading } from "@/provider/PageLoadingProvider";

type CustomLinkType = LinkProps &
  HTMLProps<HTMLAnchorElement> & {
    clickEffectProps?: DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    customRef?: Ref<HTMLAnchorElement>;
    effectClassName?: string;
    hasClickEffect?: boolean;
    href: string | (UrlObject & string);
    onClick?: (
      e?:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void;
  };

export type CustomLinkProps = CustomLinkType;

const CustomLink = ({
  children,
  className,
  clickEffectProps,
  effectClassName,
  hasClickEffect,
  href,
  onClick,
  customRef,
  target,
  ...props
}: CustomLinkProps) => {
  const pathname = usePathname();
  const { setIsPageLoading } = usePageLoading();

  const addPageLoading = () => {
    setIsPageLoading(true);
  };

  const handleSamePathnameClick = (path: string) => {
    if (path.endsWith("/")) {
      const pathSplitted = path.split("/");
      pathSplitted.pop();
      path = pathSplitted.join("/");
    }

    pathname === path
      ? setTimeout(() => {
          setIsPageLoading(false);
        }, 1000)
      : {};
  };

  const LinkComp = (
    <Link
      className={cn("no-underline", className)}
      {...props}
      style={{
        ...props.style,
        fontFamily: getFontFamily(children),
      }}
      target={target}
      shallow
      prefetch
      ref={customRef}
      href={href || ""}
      onClick={(e) => {
        onClick?.();
        if (
          !e.ctrlKey &&
          !e.metaKey &&
          target !== "blank" &&
          !href.includes("mailto:") &&
          !href.includes("tel:")
        ) {
          target !== "_blank" && addPageLoading?.();
          target !== "_blank" && handleSamePathnameClick?.(href as string);
        }
      }}
    >
      {children}
    </Link>
  );

  return hasClickEffect ? (
    <ClickEffect {...clickEffectProps} className={effectClassName}>
      {LinkComp}
    </ClickEffect>
  ) : (
    LinkComp
  );
};

export { CustomLink };
