import type { ActionItem as ActionItemType } from "../types";
import ActionItem from "./ActionItem";

interface Props {
  items: ActionItemType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, value: string) => void;
}

export default function ActionList({
  items,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  return (
    <>
      {items.map((item) => (
        <ActionItem
          key={item.id}
          item={item}
          toggleDone={onToggle}
          deleteTask={onDelete}
          updateTask={(id, updated) => onEdit(id, updated.task || "")}
        />
      ))}
    </>
  );
}
