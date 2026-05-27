import { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from "react";

interface IProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const ClickEffect = ({
  children,
  style,
  fullWidth,
  disabled,
  ...rest
}: IProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <div
      onMouseDown={() => !disabled && setIsMouseDown(true)}
      onMouseUp={() => !disabled && setIsMouseDown(false)}
      onMouseOut={() => !disabled && setIsMouseDown(false)}
      style={{
        position: "relative",
        top: isMouseDown ? 1.3 : 0,
        width: fullWidth ? "100%" : "unset",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export { ClickEffect };
