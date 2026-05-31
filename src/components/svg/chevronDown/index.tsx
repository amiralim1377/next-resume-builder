import React from "react";

type ChevronDownProps = {
  size?: string | number;
  className?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  fill?: string;
  stroke?: string;
};

function ChevronDown({
  size = 24,
  className,
  fill,
  onClick,
  stroke,
  color = "currentColor",
}: ChevronDownProps) {
  return (
    <div onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        viewBox="0 -960 960 960"
        width={size}
        className={className}
        color={color}
        fill={fill}
        stroke={stroke}
      >
        <path d="M480-360 280-560h400L480-360Z" />
      </svg>
    </div>
  );
}

export { ChevronDown };
