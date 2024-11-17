import TaskList from "../components/tasks/TaskList";
//import TaskForm from "../components/tasks/TaskForm";

const Tasks = () => {
  return (
    <div className="p-4">
      {/* <TaskForm onTaskAdded={() => window.location.reload()} /> */}
      <TaskList />
    </div>
  );
};

export default Tasks;
