import { useState } from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask) return;
    setTasks([...tasks, { text: newTask, id: Date.now() }]);
    setNewTask("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdate = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  return (
    <Box p="20px">
      <div>
        <Header title="TASK" subtitle="Managing task for staff" fontSize="36px" mt="20px" />

        <form onSubmit={handleSubmit}>
          <label htmlFor="newTask">Enter a new task:</label>
          <div>
            <input
              id="newTask"
              type="text"
              placeholder="Enter a new task"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
            />
            <button type="submit">Add</button>
          </div>
        </form>

        {tasks.length > 0 && (
          <div>
            {tasks.map((task) => (
              <div key={task.id}>
                <div style={{ textDecoration: task.completed ? "line-through" : "" }}>
                  {task.text}
                </div>
                <div>
                  <button onClick={() => handleUpdate(task.id, prompt("Enter new task text"))}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Box>
  );
}

export default TaskList;
