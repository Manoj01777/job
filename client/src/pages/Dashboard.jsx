import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navbar for recruiter panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={(e) => navigate("/")}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, Manoj</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full cursor-pointer"
                src={assets.company_icon}
                alt="Company Icon"
              />
              <div className="absolute hidden group-hover:flex flex-col items-start bg-white shadow-lg border top-full right-0 z-10 text-black rounded p-2">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        {/* Left sidebar with options */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full rounded-lg text-gray-800 transition duration-300 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-600"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img
                className="min-w-4"
                src={assets.add_icon}
                alt="Add Job Icon"
              />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full rounded-lg text-gray-800 transition duration-300 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-300 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-600"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img
                className="min-w-4"
                src={assets.home_icon}
                alt="Manage Jobs Icon"
              />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full rounded-lg text-gray-800 transition duration-300 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700"
                    : "hover:bg-gray-100 hover:text-blue-600"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img
                className="min-w-4"
                src={assets.person_tick_icon}
                alt="View Applications Icon"
              />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Content area that uses Outlet */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
