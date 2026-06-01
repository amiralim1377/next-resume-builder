import { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { BasicLoader, BasicLoaderProps } from "./BasicLoader";

interface Props extends BasicLoaderProps {
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  height?: number | string;
  size?: number;
}

const LoadingView = ({
  wrapperClassName,
  wrapperStyle,
  height,
  size,
  ...basicLoaderProps
}: Props) => {
  return (
    <div
      style={{ ...wrapperStyle, height, maxHeight: height }}
      className={cn(
        "flex flex-1 items-center justify-center",
        wrapperClassName,
      )}
    >
      <BasicLoader {...basicLoaderProps} size={size || 10} />
    </div>
  );
};

export { LoadingView };
