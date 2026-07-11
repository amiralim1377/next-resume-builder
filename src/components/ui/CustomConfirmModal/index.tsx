"use client";

import { ReactNode } from "react";

import { CustomModal } from "../CustomModal";
import { CustomButton } from "../CustomButton";

type ButtonProps = React.ComponentProps<typeof CustomButton>;

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;

  title?: ReactNode;
  children: ReactNode;

  icon?: ReactNode;

  confirmButtonProps: ButtonProps;
  cancelButtonProps: ButtonProps;

  className?: string;
  contentClassName?: string;
  actionsClassName?: string;
};

function CustomConfirmModal({
  isOpen,
  onClose,
  title,
  children,
  icon,
  confirmButtonProps,
  cancelButtonProps,
  className,
  contentClassName,
  actionsClassName,
}: ConfirmModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      className={className ?? "max-w-md p-6"}
    >
      <div className={contentClassName}>
        {(icon || title) && (
          <div className="flex items-center gap-3">
            {icon}

            {title && (
              <h3 className="text-text-primary text-lg font-semibold">
                {title}
              </h3>
            )}
          </div>
        )}

        <div className="text-text-secondary mt-4 text-sm leading-relaxed">
          {children}
        </div>

        <div
          className={
            actionsClassName ??
            "mt-6 flex gap-3 ltr:justify-end rtl:justify-end"
          }
        >
          <CustomButton type="button" {...cancelButtonProps} />

          <CustomButton type="button" {...confirmButtonProps} />
        </div>
      </div>
    </CustomModal>
  );
}

export { CustomConfirmModal };
