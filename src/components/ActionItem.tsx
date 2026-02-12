import { useState } from "react";
import type { ActionItem as ActionItemType } from "../types";

interface Props {
  item: ActionItemType;
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updated: Partial<ActionItemType>) => void;
}

export default function ActionItem({
  item,
  toggleDone,
  deleteTask,
  updateTask,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(item.task);

  const handleSave = () => {
    updateTask(item.id, { task: editedTask });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-start gap-4 p-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
      {/* Task Info */}
      <div className="flex-1">
        {isEditing ? (
          <input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40"
          />
        ) : (
          <p
            className={`text-white font-medium ${
              item.done ? "line-through text-neutral-500" : ""
            }`}
          >
            {item.task}
          </p>
        )}

        {item.owner && (
          <p className="text-sm text-neutral-400 mt-1">Owner: {item.owner}</p>
        )}
        {item.due && (
          <p className="text-sm text-neutral-400 mt-0.5">Due: {item.due}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => toggleDone(item.id)}
          className="px-4 py-1 rounded-full font-medium text-black bg-white hover:bg-gray-200 transition-shadow shadow-md"
        >
          {item.done ? "Done" : "Mark Done"}
        </button>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-1 rounded-full font-medium text-black bg-white hover:bg-gray-200 transition-shadow shadow-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-1 rounded-full font-medium text-white bg-neutral-700 hover:bg-neutral-600 transition-all"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTask(item.id)}
          className="px-4 py-1 rounded-full font-medium text-white bg-red-600 hover:bg-red-500 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
