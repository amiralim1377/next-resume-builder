import { cn } from "@/utils/cn";
import { CheckCircle } from "@/components/svg/CheckCircle";
import { ConnectorLine } from "./components/ConnectorLine";

export type StepperItem = {
  id: string;
  stepNumber: number;
  title: string;
  statusText: string;
  isCompleted: boolean;
  isActive: boolean;
  isPending: boolean;
};

type Props = {
  items: StepperItem[];
  onItemClick?: (index: number) => void;
  className?: string;
};

export const CustomFormStepper = ({ items, onItemClick, className }: Props) => {
  return (
    <div className={cn("flex w-full items-start justify-between", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative flex flex-1 cursor-pointer flex-col items-center gap-2"
          onClick={() => onItemClick?.(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onItemClick?.(index);
            }
          }}
          aria-label={`Step ${item.stepNumber}: ${item.title}`}
        >
          {index !== items.length - 1 && (
            <ConnectorLine isCompleted={item.isCompleted} />
          )}

          <div
            className={cn(
              "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
              item.isCompleted &&
                "border-state-success bg-state-success text-inverse",
              item.isActive &&
                "border-brandPrimary bg-ui-surface text-brandPrimary ring-4 ring-accentLight",
              item.isPending &&
                "border-ui-border bg-ui-bg text-text-muted",
            )}
          >
            {item.isCompleted ? (
              <CheckCircle size={16} />
            ) : (
              <div className="h-3 w-3 rounded-full bg-current" />
            )}
          </div>

          <div className="mt-2 text-center">
            <p className="text-text-muted text-[10px] font-semibold tracking-wider uppercase">
              Step {item.stepNumber}
            </p>

            <p
              className={cn(
                "text-sm font-semibold",
                item.isActive ? "text-text-primary" : "text-text-secondary",
              )}
            >
              {item.title}
            </p>

            <p
              className={cn(
                "mt-1 text-xs",
                item.isCompleted
                  ? "text-state-success"
                  : item.isActive
                    ? "text-brandPrimary"
                    : "text-text-muted",
              )}
            >
              {item.statusText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
