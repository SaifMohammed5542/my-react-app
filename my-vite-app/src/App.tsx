import { useState, useEffect } from "react";
import "./styles.css"; // Import the external CSS file

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load tasks from local storage on mount
  useEffect(() => {
    const savedTasks: string[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    if (editingIndex !== null) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  const editTask = (index: number) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          onKeyPress={(e) => e.key === "Enter" && addTask()} // Allow adding task on pressing Enter
        />
        <button onClick={addTask}>
          {editingIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Render task list */}
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">
            <span>{t}</span>
            <div className="task-actions">
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}