"use client";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isMounted, setIsMounted] = useState(false);
  const { colors } = useThemeColors();

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

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

  if (!isMounted) return null;

  const getModalWidth = (): string => {
    if (typeof size === "number") return `${size}px`;
    if (typeof size === "string") return size;
    return "600px";
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-0 z-9998 bg-black/50 backdrop-blur-[3px]",
              classNames?.overlay,
              classNames?.root,
            )}
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            className={cn(
              "pointer-events-none fixed inset-0 z-9999 flex max-h-dvh items-center justify-center p-4",
              classNames?.inner,
            )}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "bg-ui-surface pointer-events-auto relative flex w-full flex-col rounded-2xl p-4",
                noBorder && "border-0! border-none",
                classNames?.content,
                className,
              )}
              style={{
                ...style,
                maxWidth: getModalWidth(),
              }}
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
                        "text-text-primary flex-1 text-2xl font-semibold",
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export { CustomModal };
