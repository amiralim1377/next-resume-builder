import React from "react";
import { CustomAvatar } from "../customAvatar";
import { cn } from "@/utils/cn";

type AvatarProps = React.ComponentProps<typeof CustomAvatar>;

export interface UserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string;
  label?: string;
  avatarProps?: Omit<AvatarProps, "name">;
  layout?: "horizontal" | "vertical";
  nameClassName?: string;
  labelClassName?: string;
}

const CustomUserInfo: React.FC<UserInfoProps> = ({
  userName,
  label,
  avatarProps,
  layout = "horizontal",
  className = "",
  nameClassName = "",
  labelClassName = "",
  ...props
}) => {
  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={cn(
        "flex",
        isHorizontal
          ? "items-center space-x-3 text-left"
          : "flex-col items-center space-y-2 text-center",
        className,
      )}
      {...props}
    >
      {avatarProps && <CustomAvatar name={userName} {...avatarProps} />}

      <div className="flex flex-col">
        <span className={cn(nameClassName)}>{userName}</span>
        {label && <span className={cn(labelClassName)}>{label}</span>}
      </div>
    </div>
  );
};

export { CustomUserInfo };
