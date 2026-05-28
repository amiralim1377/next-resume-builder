import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState } from "react";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarShape = "circle" | "square";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  fallbackDelay?: number;
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
};

const statusColors: Record<Exclude<AvatarStatus, "none">, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

const CustomAvatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  name,
  size = "md",
  shape = "circle",
  status = "none",
  className = "",
  ...props
}) => {
  const [imgError, setImgError] = useState(false);

  const roundedClass = shape === "circle" ? "rounded-full" : "rounded-xl";
  const baseClasses = `relative inline-flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium ${sizeClasses[size]} ${roundedClass} ${className}`;

  return (
    <div className={baseClasses} {...props}>
      {src && !imgError ? (
        <Image
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className={cn("h-full w-full object-cover", roundedClass)}
        />
      ) : (
        <span className="select-none">{name ? getInitials(name) : "?"}</span>
      )}

      {status !== "none" && (
        <span
          className={cn(
            "absolute right-0 bottom-0 block border-2 border-white dark:border-gray-900",
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
