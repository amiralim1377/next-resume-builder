import { CustomButton } from "@/components/ui/CustomButton";
import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react";

interface EmptyStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
  className?: string;
  iconSize?: number;
  iconColor?: string;
}

const EmptyStep = ({
  buttonLabel,
  description,
  icon: Icon,
  onClick,
  title,
  className,
  iconSize = 28,
  iconColor = "text-brand-primary",
}: EmptyStepProps) => {
  return (
    <div
      className={cn(
        "border-ui-border flex flex-col items-center justify-center rounded-xl border px-6 py-14 text-center",
        className,
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "bg-brandActive mb-5 grid h-14 w-14 place-items-center rounded-full",
          iconColor,
        )}
      >
        {/* Pass iconSize to the native size prop */}
        <Icon size={iconSize} />
      </div>

      {/* Title */}
      <h4 className="text-text-primary text-base font-semibold">{title}</h4>

      {/* Description */}
      <p className="text-text-secondary mt-1 max-w-xs text-sm">{description}</p>

      {/* Action button */}

      <CustomButton
        onClick={onClick}
        type="button"
        className="mt-5 flex items-center gap-x-1.5"
      >
        <Icon className="h-4 w-4" />
        {buttonLabel}
      </CustomButton>
    </div>
  );
};

export { EmptyStep };
