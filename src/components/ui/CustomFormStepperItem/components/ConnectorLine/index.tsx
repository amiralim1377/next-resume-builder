import { cn } from "@/utils/cn";

type ConnectorLineProps = {
  isCompleted: boolean;
};

function ConnectorLine({ isCompleted }: ConnectorLineProps) {
  return (
    <div
      className={cn(
        "absolute top-4 left-[-45%] h-0.5 w-[calc(100%-2rem)] transition-colors",
        isCompleted ? "bg-state-success" : "bg-gray-200",
      )}
    />
  );
}

export { ConnectorLine };
