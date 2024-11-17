import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { UserProvider } from "./UserContext";

// Use lazy loading for routes
const Register = lazy(() => import("./components/auth/Register"));
const NotFound = lazy(() => import("./components/NotFound"));
const Login = lazy(() => import("./components/auth/Login"));
const Task = lazy(() => import("./pages/Task"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));



function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className="text-center">...loading</div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
