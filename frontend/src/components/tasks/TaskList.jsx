import { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import api from "../../api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch tasks!");
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete task!");
    }
  };

  const handleUpdate = (task) => {
    setTaskToEdit(task);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null);
  };

  const handleComplete = async (id) => {
    try {
      const response = await api.patch(`/tasks/${id}/complete`);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to complete task!");
      
    }
  };

  const clearEdit = () => setTaskToEdit(null);

  return (
    <MaxWidthWrapper>
      <div className="my-8">
        <TaskForm
          onTaskAdded={() => window.location.reload()}
          taskToEdit={taskToEdit}
          onTaskUpdated={handleTaskUpdated}
          clearEdit={clearEdit}
        />
      </div>
      <div className="py-8">
        <h1 className="text-2xl text-center font-bold mb-4">Task List</h1>

        <div className="space-y-2 mt-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onComplete={handleComplete}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default TaskList;
