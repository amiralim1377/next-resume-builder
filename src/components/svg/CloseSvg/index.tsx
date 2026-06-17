type CloseSvgProps = {
  onClick?: () => void;
  color?: string;
  size?: number;
  className?: string;
};

function CloseSvg({ color, size, onClick, className }: CloseSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      fill={color}
      height={size}
      onClick={onClick}
      className={className}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}

export { CloseSvg };
