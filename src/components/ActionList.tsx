import type { ActionItem } from "../types";
import ActionItemComponent from "./ActionItem";

interface Props {
  items: ActionItem[];
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
  if (!items.length) return <p className="text-gray-500">No tasks found.</p>;

  return (
    <div className="mt-4">
      {items.map((item) => (
        <ActionItemComponent
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
