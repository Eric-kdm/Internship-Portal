import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Admin",
      path: "/admin",
    },
    {
      name: "Reports",
      path: "/reports",
    },
    {
      name: "Attendance",
      path: "/attendance",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-6">

      {/* Top */}
      <div>

        {/* Logo */}
        <h1 className="text-4xl font-black text-blue-600 mb-12">
          Architect
        </h1>

        {/* Menu */}
        <div className="flex flex-col gap-3">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`p-4 rounded-2xl font-semibold transition-all

                ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100"
                }

              `}
            >
              {item.name}
            </Link>

          ))}

        </div>

      </div>

      {/* Bottom Profile */}
      <div className="border-t pt-6">

        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">

            A

          </div>

          <div>

            <h2 className="font-bold text-lg">
              Alex Rivers
            </h2>

            <p className="text-gray-400 text-sm">
              ADMIN LEAD
            </p>

          </div>

        </div>

        <button className="w-full py-4 bg-gray-100 rounded-2xl font-semibold hover:bg-gray-200 transition-all">

          View Profile

        </button>

      </div>

    </div>
  );
}

export default Sidebar;