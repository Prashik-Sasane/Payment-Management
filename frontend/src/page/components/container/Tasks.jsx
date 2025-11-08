import React, { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Review October payroll submissions",
    dueDate: "2025-11-05",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Update employee benefits documentation",
    dueDate: "2025-11-10",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Conduct payroll audit for Q3",
    dueDate: "2025-11-12",
    priority: "High",
    status: "Completed",
  },
  {
    id: 4,
    title: "Schedule staff training on payroll software",
    dueDate: "2025-11-20",
    priority: "Low",
    status: "Pending",
  },
];

const statusOptions = ["All", "Pending", "In Progress", "Completed"];

const priorityColors = {
  High: "bg-red-700 text-white",
  Medium: "bg-yellow-400 text-black",
  Low: "bg-gray-400 text-black",
};

const TaskPage = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [tasks, setTasks] = useState(initialTasks);

  const filteredTasks =
    filterStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-100 to-black text-black font-sans">
      {/* Header */}
      <header className="bg-white py-8 shadow text-center">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          View, filter, and manage your payroll-related tasks efficiently.
        </p>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Filter Options */}
        <div className="flex flex-wrap gap-4 justify-center">
          {statusOptions.map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filterStatus === status
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow divide-y divide-gray-300">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-600 p-12">No tasks found</p>
          ) : (
            filteredTasks.map(({ id, title, dueDate, priority, status }) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                  <h3
                    className={`font-semibold text-lg ${
                      status === "Completed" ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {title}
                  </h3>
                  <span className="text-sm text-gray-600">
                    Due{" "}
                    <time dateTime={dueDate}>
                      {new Date(dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColors[priority]}`}
                    title={`Priority: ${priority}`}
                  >
                    {priority}
                  </span>
                </div>

                <div className="flex gap-4 items-center mt-3 sm:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      status === "Completed"
                        ? "bg-green-700 text-white"
                        : "bg-gray-400 text-black"
                    }`}
                    title={`Status: ${status}`}
                  >
                    {status}
                  </span>
                  <button
                    onClick={() => toggleComplete(id)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      status === "Completed"
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-green-700 text-white hover:bg-green-800"
                    }`}
                  >
                    {status === "Completed" ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button className="px-4 py-2 text-black border border-gray-400 rounded-lg hover:bg-gray-200 transition font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white text-gray-700 text-sm text-center py-6 border-t border-gray-200 mt-auto">
        &copy; {new Date().getFullYear()} PayRollPro, All rights reserved.
      </footer>
    </div>
  );
};

export default TaskPage;
