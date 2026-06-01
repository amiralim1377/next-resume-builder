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
        >
          {index !== items.length - 1 && (
            <ConnectorLine isCompleted={item.isCompleted} />
          )}

          <div
            className={cn(
              "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
              item.isCompleted && "border-teal-600 bg-teal-600 text-white",
              item.isActive &&
                "border-blue-600 bg-white text-blue-600 ring-4 ring-blue-50",
              item.isPending && "border-gray-200 bg-gray-100 text-gray-400",
            )}
          >
            {item.isCompleted ? (
              <CheckCircle size={16} />
            ) : (
              <div className="h-3 w-3 rounded-full bg-current" />
            )}
          </div>

          <div className="mt-2 text-center">
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              Step {item.stepNumber}
            </p>

            <p
              className={cn(
                "text-sm font-semibold",
                item.isActive ? "text-gray-900" : "text-gray-600",
              )}
            >
              {item.title}
            </p>

            <p
              className={cn(
                "mt-1 text-xs",
                item.isCompleted
                  ? "text-teal-600"
                  : item.isActive
                    ? "text-blue-600"
                    : "text-gray-400",
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
