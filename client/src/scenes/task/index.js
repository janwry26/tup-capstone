import { useState } from "react";
import Header from "../../components/Header";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Box } from "@mui/material";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask || selectedStaffId === 0) return;
    const task = {
      taskID: Date.now(),
      staffID: selectedStaffId,
      taskDescription: newTask,
      taskStatus: "Incomplete",
      taskAccomplishDate: null,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setSelectedStaffId(0);
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
        setTasks(tasks.filter((task) => task.taskID !== id));
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
            task.taskID === id ? { ...task, taskDescription: result.value } : task
          )
        );
        Swal.fire("Updated!", "Your task has been updated.", "success");
      }
    });
  };

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.taskID === id
          ? {
              ...task,
              taskStatus: "Complete",
              taskAccomplishDate: new Date().toLocaleString(),
            }
          : task
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
    <Form.Control
      type="text"
      placeholder="Assign to staff ID"
      value={selectedStaffId}
      onChange={(event) => setSelectedStaffId(event.target.value)}
      style={{ marginBottom: "10px" }}
    />
    <Button className="btnSignin" type="submit" color="success" variant="success">
      Create
    </Button>
  </Form.Group>
</Form>

        <h2 className="mt-4">TASK CREATED BELOW:</h2>

        {tasks.length > 0 && (
          <div className="mt-3">
            {tasks.map((task) => (
  <div key={task.taskID} className="d-flex justify-content-between align-items-center p-3 mb-3 shadow-sm">
    <div>
      <h5>{task.taskDescription}</h5>
      <p>Assigned to Staff ID {task.staffID}</p>
      <p>Status: {task.taskStatus}</p>
      {task.taskAccomplishDate && (
        <p>Completed on: {task.taskAccomplishDate}</p>
      )}
    </div>
    <div>
      {task.taskStatus !== "Complete" && (
        <Button variant="success" onClick={() => handleComplete(task.taskID)}>
          Complete
        </Button>
      )}
      <Button variant="warning" className="mx-2" onClick={() => handleUpdate(task.taskID, task.taskDescription)}>
        Edit
      </Button>
      <Button variant="danger" onClick={() => handleDelete(task.taskID)}>
        Delete
      </Button>
    </div>
  </div>
))}


</div>
)}

    {tasks.length === 0 && (
      <div className="mt-3">
        <p>No tasks have been added yet. Please add a task.</p>
      </div>
    )}
  </div>
</Box>
);
}

export default TaskList;