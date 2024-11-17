import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Home = () => {
  const { userInfo } = useContext(UserContext); // Get user info from context

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      {userInfo ? (
        <Link
          to="/tasks"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Tasks
        </Link>
      ) : (
        <p className="text-gray-600">
          Please{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            log in
          </Link>{" "}
          to access your tasks.
        </p>
      )}
    </div>
  );
};

export default Home;
