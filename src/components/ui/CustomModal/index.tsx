import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseSvg } from "@/components/svg/CloseSvg";
import { cn } from "@/utils/cn";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";

interface ClassNamesProps {
  body: string;
  close: string;
  content: string;
  header: string;
  inner: string;
  overlay: string;
  root: string;
  title: string;
}

export interface CustomModalProps {
  children: ReactNode;
  className?: string;
  classNames?: Partial<ClassNamesProps>;
  hasHeader?: boolean;
  isOpen: boolean;
  noBorder?: boolean;
  onClose: () => void;
  size?: number | string;
  style?: CSSProperties;
  title?: ReactNode;
  withCloseButton?: boolean;
}
const ANIMATION_DURATION = 200;

const CustomModal = ({
  children,
  className,
  classNames,
  hasHeader = true,
  isOpen,
  noBorder,
  onClose,
  size,
  style,
  title,
  withCloseButton = true,
}: CustomModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { colors } = useThemeColors();

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, ANIMATION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // SSR / Hydration safety + don't render when closed and animation finished
  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getModalWidth = (): string => {
    if (typeof size === "number") return `${size}px`;
    if (typeof size === "string") return size;
    return "600px";
  };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-9998 flex max-h-dvh items-center justify-center bg-transparent backdrop-blur-none transition-all duration-200 ease-out",
        isVisible && "bg-black/50 backdrop-blur-[3px]",
        classNames?.overlay,
        classNames?.root,
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "flex max-h-screen w-full items-center justify-center p-4",
          classNames?.inner,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "bg-ui-bg relative flex w-full translate-y-5 scale-95 flex-col rounded-2xl p-4 opacity-0 transition-all duration-200 ease-out",
            isVisible && "translate-y-0 scale-100 opacity-100",
            noBorder && "border-0! border-none",
            classNames?.content,
            className,
          )}
          style={{
            ...style,
            maxWidth: getModalWidth(),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {hasHeader && (title || withCloseButton) && (
            <div
              className={cn(
                "relative flex items-center justify-between bg-transparent p-2",
                classNames?.header,
              )}
            >
              {title && (
                <div
                  className={cn(
                    "text-textTertiary flex-1 text-2xl font-semibold",
                    classNames?.title,
                  )}
                >
                  {title}
                </div>
              )}
              {withCloseButton && (
                <button
                  onClick={onClose}
                  className={cn(
                    "text-accent absolute inset-e-2 top-2 flex cursor-pointer items-center justify-center border-0 bg-transparent",
                    classNames?.close,
                  )}
                  aria-label="Close modal"
                  type="button"
                >
                  <CloseSvg color={colors.text?.secondary} size={20} />
                </button>
              )}
            </div>
          )}

          <div
            className={cn(
              "flex-1 overflow-y-auto bg-transparent p-2",
              classNames?.body,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export { CustomModal };
