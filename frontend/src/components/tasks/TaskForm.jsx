import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../../api";
import MaxWidthWrapper from "../MaxWidthWrapper";

const TaskForm = ({ onTaskAdded, taskToEdit, onTaskUpdated, clearEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        await api.put(`/tasks/${taskToEdit.id}`, { title, description });
        onTaskUpdated({ ...taskToEdit, title, description });
        alert("Task updated successfully!");
        clearEdit();
      } else {
        await api.post("/tasks", { title, description });
        onTaskAdded();
        alert("Task added successfully!");
      }
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to save task!");
    }
  };

  return (
    <MaxWidthWrapper>
      <h1 className="text-2xl text-center font-bold my-7">Task Manager</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className={`${
            taskToEdit
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded`}
        >
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
        {taskToEdit && (
          <button
            type="button"
            onClick={clearEdit}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
    </MaxWidthWrapper>
  );
};

TaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
  taskToEdit: PropTypes.object,
  onTaskUpdated: PropTypes.func.isRequired,
  clearEdit: PropTypes.func.isRequired,
};
export default TaskForm;
