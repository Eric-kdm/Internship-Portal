import { Link, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 bg-white min-h-screen shadow-sm p-6 flex flex-col">

      {/* Logo */}
      <h1 className="text-4xl font-bold text-blue-600 mb-10">
        Architect
      </h1>

      {/* Profile Card */}
      <div className="bg-gray-100 rounded-2xl p-5 text-center mb-8">

        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>

        <h3 className="font-bold text-xl">
          Alex Rivers
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Product Design Intern
        </p>

        <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg shadow-sm">
          View Profile
        </button>

      </div>

      {/* Menu */}
      <ul className="space-y-2">

        <Link
          to="/organization-dashboard"
          className={`flex items-center gap-3 p-4 rounded-xl font-medium ${
            location.pathname === "/organization-dashboard"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/manage-applications"
          className={`flex items-center gap-3 p-4 rounded-xl font-medium ${
            location.pathname === "/manage-applications"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          📄 Manage Applications
        </Link>

        <Link
          to="/my-posted-internships"
          className={`flex items-center gap-3 p-4 rounded-xl font-medium ${
            location.pathname === "/my-posted-internships"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          📋 My Posted Internships
        </Link>

        <Link
          to="/organization-settings"
          className={`flex items-center gap-3 p-4 rounded-xl font-medium ${
            location.pathname === "/organization-settings"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          ⚙️ Settings
        </Link>

      </ul>

      {/* Upgrade Card */}
      <div className="mt-auto bg-blue-50 rounded-xl p-4">

        <h4 className="text-blue-600 font-bold mb-2">
          Upgrade Pro
        </h4>

        <p className="text-xs text-gray-600 leading-relaxed">
          Access elite recruitment analytics and advanced hiring tools.
        </p>

      </div>

    </aside>
  );
}

export default DashboardSidebar;