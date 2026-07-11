import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode, memo, useMemo } from "react";

type SortableItemProps = {
  id: string;
  children: (props: {
    dragListeners: Record<string, unknown> | undefined;
  }) => ReactNode;
};

const SortableItemComponent = ({ id, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 200,
      easing: "cubic-bezier(0.2, 0, 0, 1)",
    },
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 1,
    position: "relative" as const,
    touchAction: "none",
  };

  const childContext = useMemo(
    () => ({
      dragListeners: listeners ? { ...attributes, ...listeners } : undefined,
    }),
    [attributes, listeners],
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full will-change-transform"
    >
      {children(childContext)}
    </div>
  );
};

export const SortableItem = memo(SortableItemComponent);
