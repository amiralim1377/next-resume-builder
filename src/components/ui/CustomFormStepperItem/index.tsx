import { cn } from "@/utils/cn";
import { CheckCircle } from "@/components/svg/CheckCircle";
import { ConnectorLine } from "./components/ConnectorLine";

type Props = {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  isLast: boolean;
  onClick: () => void;
};

export const FormStepperItem = ({
  stepNumber,
  title,
  isActive,
  isCompleted,
  isPending,
  isLast,
  onClick,
}: Props) => {
  return (
    <div
      className="relative flex flex-1 cursor-pointer flex-col items-center gap-2"
      onClick={onClick}
    >
      {/* Logic for line is here, but data is passed in as isLast */}
      {!isLast && <ConnectorLine isCompleted={isCompleted} />}

      <div
        className={cn(
          "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
          isCompleted && "border-teal-600 bg-teal-600 text-white",
          isActive &&
            "border-blue-600 bg-white text-blue-600 ring-4 ring-blue-50",
          isPending && "border-gray-200 bg-gray-100 text-gray-400",
        )}
      >
        {isCompleted ? (
          <CheckCircle size={16} />
        ) : (
          <div className="h-3 w-3 rounded-full bg-current" />
        )}
      </div>

      <div className="mt-2 text-center">
        <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
          Step {stepNumber}
        </p>
        <p
          className={cn(
            "text-sm font-semibold",
            isActive ? "text-gray-900" : "text-gray-600",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "mt-1 text-xs",
            isCompleted
              ? "text-teal-600"
              : isActive
                ? "text-blue-600"
                : "text-gray-400",
          )}
        >
          {isCompleted ? "Completed" : isActive ? "In Progress" : "Pending"}
        </p>
      </div>
    </div>
  );
};
