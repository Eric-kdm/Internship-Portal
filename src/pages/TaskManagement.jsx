import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";

function TaskManagement() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("internshipTasks")) || [
      { id: 1, title: "Set up development environment", status: "done" },
      { id: 2, title: "Review onboarding documentation", status: "in-progress" },
      { id: 3, title: "Attend kickoff meeting with the team", status: "todo" },
    ]
  );
  const [newTask, setNewTask] = useState("");

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem("internshipTasks", JSON.stringify(updated));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    saveTasks([...tasks, { id: Date.now(), title: newTask.trim(), status: "todo" }]);
    setNewTask("");
  };

  const cycleStatus = (id) => {
    const order = ["todo", "in-progress", "done"];
    saveTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: order[(order.indexOf(t.status) + 1) % order.length] }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  const statusStyles = {
    todo: "bg-gray-100 text-gray-600",
    "in-progress": "bg-amber-100 text-amber-700",
    done: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>
        <button
          onClick={() => navigate("/student-dashboard")}
          className="text-blue-700 font-semibold hover:underline"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-extrabold mb-3">My Tasks</h1>
        <p className="text-gray-500 text-lg mb-4">
          Keep track of what needs to get done during your internship.
        </p>

        <div className="mb-10">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
            Personal tracker — saved on this device only
          </span>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex gap-3 mb-8">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="flex-1 bg-gray-100 rounded-xl px-5 py-3 outline-none"
            />
            <button
              onClick={addTask}
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition"
            >
              <FaPlus />
              Add
            </button>
          </div>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No tasks yet — add one above to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4"
                >
                  <p
                    className={
                      task.status === "done"
                        ? "line-through text-gray-400"
                        : "font-medium"
                    }
                  >
                    {task.title}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => cycleStatus(task.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusStyles[task.status]}`}
                    >
                      {statusLabels[task.status]}
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TaskManagement;
