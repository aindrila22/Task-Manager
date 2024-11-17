import PropTypes from "prop-types";
import MaxWidthWrapper from "../MaxWidthWrapper";

const TaskItem = ({ task, onDelete, onUpdate, onComplete }) => {
  return (
    <MaxWidthWrapper>
      <div className="p-4 border rounded flex justify-between items-center">
        <div>
          <h2 className="font-bold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            className={`${
              task.status !== "completed"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-4 py-2 rounded`}
            onClick={() => onComplete(task.id)}
          >
            {task.status !== "completed" ? "Pending" : "Completed"}
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => onUpdate(task)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default TaskItem;
