/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ActionItem from "./components/ActionItem";
import type { ActionItem as ActionItemType } from "./types";

interface HistoryItem {
  id: string;
  transcript: string;
  tasks: ActionItemType[];
  createdAt: string;
}

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState<ActionItemType[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const totalTasks = tasks.length;
  const openTasks = tasks.filter((t) => !t.done).length;
  const doneTasks = tasks.filter((t) => t.done).length;

  const handleExtract = async () => {
    if (!transcript.trim()) return;

    try {
      const res = await fetch("http://localhost:3001/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      if (!res.ok) throw new Error("Failed to extract action items");

      const data = await res.json();
      const tasksFromAPI: ActionItemType[] = data.tasks || [];

      setTasks(tasksFromAPI);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        transcript,
        tasks: tasksFromAPI,
        createdAt: new Date().toISOString(),
      };
      setHistory((prev) => [newHistoryItem, ...prev].slice(0, 5));
    } catch (err) {
      console.error("Error extracting action items:", err);
    }
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task: ActionItemType = {
      id: Date.now().toString(),
      task: newTask,
      done: false,
    };
    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = (id: string, updated: Partial<ActionItemType>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "open") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Action Tracker
          </h1>
          <p className="text-neutral-400 mt-2 text-lg sm:text-xl max-w-2xl mx-auto">
            Track and manage meeting action items efficiently.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Tasks", value: totalTasks },
            { label: "Open Tasks", value: openTasks },
            { label: "Completed", value: doneTasks },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-800/60 border border-gray-700 rounded-3xl p-6 shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              <p className="text-neutral-400 text-sm">{stat.label}</p>
              <p className="text-3xl sm:text-4xl font-bold mt-2 text-emerald-400">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            {/* Transcript */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-neutral-300 mb-4">
                Meeting Transcript
              </h2>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste meeting transcript here..."
                className="w-full h-56 bg-gray-900/40 border border-gray-700 rounded-2xl p-4 text-white focus:outline-none focus:border-gray-400 transition-all"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleExtract}
                  className="px-8 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 shadow-md transition-all"
                >
                  Extract Items
                </button>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new action item..."
                  className="flex-1 bg-gray-900/40 border border-gray-700 rounded-2xl px-4 py-2 text-white focus:outline-none focus:border-gray-400 transition-all"
                />
                <button
                  onClick={handleAddTask}
                  className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 shadow-md transition-all"
                >
                  Add
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-4 mb-6">
                {["all", "open", "done"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type as any)}
                    className={`px-5 py-1 rounded-full text-sm font-medium transition-all ${
                      filter === type
                        ? "bg-white text-black shadow-md"
                        : "bg-white/5 border border-white/20 text-neutral-300 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Task List */}
              <div className="space-y-4 max-h-100 overflow-y-auto">
                {filteredTasks.length === 0 && (
                  <p className="text-center text-neutral-500 py-6">
                    No action items yet.
                  </p>
                )}
                {filteredTasks.map((task) => (
                  <ActionItem
                    key={task.id}
                    item={task}
                    toggleDone={handleToggle}
                    deleteTask={handleDelete}
                    updateTask={handleUpdate}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - History */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-lg font-semibold text-neutral-300 mb-4">
              Last 5 Transcripts
            </h2>

            {history.length === 0 && (
              <p className="text-neutral-500 text-sm">No history yet.</p>
            )}

            <div className="space-y-3 max-h-125 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setTranscript(item.transcript);
                    setTasks(item.tasks);
                  }}
                  className="p-4 bg-gray-900/40 border border-gray-700 rounded-2xl cursor-pointer hover:bg-gray-800/50 transition-all duration-300"
                >
                  <p className="text-xs text-neutral-500 mb-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm truncate">
                    {item.transcript.slice(0, 80)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
