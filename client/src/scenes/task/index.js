import { useState } from "react";
import Header from "../../components/Header";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {Box} from "@mui/material"
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask) return;
    setTasks([...tasks, { text: newTask, id: Date.now(), completed: false }]);
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
      icon: "info",
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

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Box p="20px" width="80%" margin="0 auto" paddingTop="50px">
      <div>
        <Header
          title="TASK"
          subtitle="Managing task for staff"
          fontSize="36px"
          mt="20px"
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Add task here..."
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              style={{ marginBottom: "10px" }}
            />
           
              <Button type="submit" color="success" variant="success">
                Create
              </Button>
          
          </Form.Group>
        </Form>
        <h2 className="mt-4">TASK CREATED BELOW:</h2>

        {tasks.length > 0 && (
          <div className="mt-3">
            {tasks.map((task) => (
              <div key={task.id} className="d-flex align-items-center ">
                <Form.Check
                  type="checkbox"
                  id={`task-${task.id}`}
                  label={task.text}
                  checked={task.completed}
                  onChange={() => handleComplete(task.id)}
                  className="flex-grow-1"
                />
              <div className="d-flex">
              <Button
                onClick={() => handleUpdate(task.id, task.text)}
                variant="info"
                className="me-2"
              >
                Update
              </Button>
              <Button
                onClick={() => handleDelete(task.id)}
                variant="danger"
              >
                Delete
              </Button>
            </div>
                  </div>
                  ))}
                  </div>
                  )}

    {tasks.length === 0 && (
      <div className="mt-3">
        <p>No tasks yet. Create a new task above.</p>
      </div>
    )}
  </div>
</Box>
);
}

export default TaskList;