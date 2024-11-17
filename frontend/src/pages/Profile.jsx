import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");

      navigate("/login");
      window.location.reload();
      window;
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <MaxWidthWrapper>
      <h1 className="text-2xl font-bold my-14 text-center">Profile</h1>

      <div className="flex justify-between items-center w-full">
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
