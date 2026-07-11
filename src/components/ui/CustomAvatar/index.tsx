"use client";
import PersonSvg from "@/components/svg/PersonSvg";
import { cn } from "@/utils/cn";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl" | "xxl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | StaticImageData;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
}

const getInitials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-24 h-24 text-2xl",
  xxl: "w-48 h-48 text-2xl",
};

const statusColors: Record<Exclude<AvatarStatus, "none">, string> = {
  online: "bg-state-success",
  offline: "bg-text-muted",
  away: "bg-stateActiveStar",
  busy: "bg-state-error",
};

const CustomAvatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  name,
  size = "md",
  shape = "circle",
  status = "none",
  className = "",
  ...rest
}) => {
  const [imgError, setImgError] = useState(false);

  const roundedClass = shape === "circle" ? "rounded-full" : "rounded-xl";
  const baseClasses = cn(
    "relative inline-flex items-center justify-center shrink-0 bg-accentLight text-text-secondary font-medium",
    sizeClasses[size],
    roundedClass,
    className,
  );

  return (
    <div className={baseClasses} {...rest}>
      {src && !imgError ? (
        <Image
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className={cn("h-full w-full object-cover", roundedClass)}
          fill
        />
      ) : (
        <span className="select-none">
          {name ? (
            getInitials(name)
          ) : (
            <PersonSvg size={20} className="text-brandLight" />
          )}
        </span>
      )}

      {status !== "none" && (
        <span
          className={cn(
            "absolute right-0 bottom-0 block border-2 border-ui-surface",
            roundedClass,
            statusColors[status],
            size === "sm"
              ? "h-2.5 w-2.5"
              : size === "md"
                ? "h-3.5 w-3.5"
                : "h-4 w-4",
          )}
          style={{
            transform:
              shape === "circle"
                ? "translate(10%, 10%)"
                : "translate(30%, 30%)",
          }}
        />
      )}
    </div>
  );
};

export { CustomAvatar };
