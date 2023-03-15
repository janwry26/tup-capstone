import { useState } from "react";
import Header from "../../components/Header";
import { Box, Button } from "@mui/material";
import "./task.css"
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((task) => task.id !== id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  const handleUpdate = (id, newText) => {
    Swal.fire({
      title: "Update task",
      input: "text",
      text: "You can update your task by typing here!",
      icon: 'info',
      inputValue: newText,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter a new task name!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, text: result.value } : task
          )
        );
        Swal.fire("Updated!", "Your task has been updated.", "success");
      }
    });
  };
  
  

  return (
    <Box p="20px">
      <div>
        <Header title="TASK" subtitle="Managing task for staff" fontSize="36px" mt="20px" />

        <form onSubmit={handleSubmit}>
        
          <label htmlFor="newTask" class="inp" for="inp">
          <div className="input-container"> 
              <input placeholder=""
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              id="newTask" type="text"/>
              <span class="label">add task here</span>
              <span class="focus-bg"></span>
              <span>
              <Button type="submit" color="secondary" variant="contained">
                Create
              </Button>
              </span>
          </div>
          </label>
          
        
          
        </form>

        {tasks.length > 0 && (
          <div>
            {tasks.map((task) => (
              <div key={task.id}>
                <div style={{ textDecoration: task.completed ? "line-through" : "" }}>
                  <h2>TASK CREATED:</h2>
                  <h3 className="task-created">{task.text}</h3>
                </div>
                <div className="btn-upd-del">
                 
                  <Button onClick={() => handleUpdate(task.id)} type="submit" color="secondary" variant="contained">
                   Update
                  </Button>
                              
                  <Button onClick={() => handleDelete(task.id)} type="submit" color="error" variant="contained">
                    Delete
                  </Button>
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
