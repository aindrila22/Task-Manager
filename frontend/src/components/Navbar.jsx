import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  const { userInfo } = useContext(UserContext);
  //console.log(userInfo)
  return (

      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/95 text-gray-600 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
        <div className="flex justify-between items-center h-14 border-b border-zinc-200">
          <Link to="/" className="flex z-40 font-semibold lg:text-base">
            Task<span className="text-purple-400">Manager</span>
          </Link>
          <div className="h-full flex items-center space-x-6">
            {userInfo ? (
              <>
                <span>Welcome, {userInfo.name}</span>
                <Link to="/profile">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/signup">Sign up</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
        </MaxWidthWrapper>
      </nav>

  );
};

export default Navbar;
