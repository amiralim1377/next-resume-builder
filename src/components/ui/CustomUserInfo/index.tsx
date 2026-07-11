import React from "react";
import { AvatarSize, CustomAvatar } from "../CustomAvatar";
import { cn } from "@/utils/cn";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { StaticImageData } from "next/image";

type AvatarProps = React.ComponentProps<typeof CustomAvatar>;

export interface UserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string;
  label?: string;
  avatarProps?: Omit<AvatarProps, "name" | "src" | "size">;
  layout?: "horizontal" | "vertical";
  nameClassName?: string;
  labelClassName?: string;
  avatarSize?: AvatarSize;
  avatarSrc?: string | StaticImageData;
}

const CustomUserInfo: React.FC<UserInfoProps> = ({
  userName,
  label,
  avatarProps,
  layout = "horizontal",
  className = "",
  nameClassName = "",
  labelClassName = "",
  avatarSize,
  avatarSrc,
  ...props
}) => {
  const isHorizontal = layout === "horizontal";
  const { lng } = useLang();
  const { t } = useTranslation(lng, "home");
  const shouldRenderAvatar = Boolean(avatarSrc || avatarProps);

  return (
    <div
      className={cn(
        "flex",
        isHorizontal
          ? "items-center space-x-3"
          : "flex-col items-center space-y-2 text-center",
        lng === "fa" ? "text-right" : "text-left",

        className,
      )}
      {...props}
    >
      {shouldRenderAvatar && (
        <CustomAvatar
          size={avatarSize}
          name={userName}
          src={avatarSrc}
          {...avatarProps}
        />
      )}

      <div className="flex flex-col">
        <span className={cn(nameClassName)}>{t(`${userName}`)}</span>
        {label && <span className={cn(labelClassName)}>{label}</span>}
      </div>
    </div>
  );
};

export { CustomUserInfo };
