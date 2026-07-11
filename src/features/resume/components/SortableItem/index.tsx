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
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 50 : "auto",
    touchAction: "none",
  };

  const childContext = useMemo(
    () => ({ dragListeners: listeners }),
    [listeners],
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="w-full">
      {children(childContext)}
    </div>
  );
};

export const SortableItem = memo(SortableItemComponent);
